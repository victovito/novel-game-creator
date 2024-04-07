import Expression from "./Expression";
import Line from "../structural/Line";
import Command from "./Command";
import NovelParsingError from "../errors/parsing/NovelParsingError";
import UnexpectedSymbolError from "../errors/parsing/UnexpectedSymbolError";
import Variable from "../values/Variable";

export default class Option extends Expression {
    text: string;
    commands: Command[] = [];
    variables: Variable[] = [];
    
    constructor(line: Line, text: string, commands: Command[], variables: Variable[]) {
        super(line);
        this.text = text;
        this.commands = commands;
        this.variables = variables;
    }

    static readonly matchExp = /^{.*}\s*(\[[a-z]+\b.*\]\s*)*$/i;

    static override tryParse(line: Line): Option {
        try {
            const match = line.content.match(this.matchExp);
            if (!match) return null;
            const textPart = match[0].match(/^^{.*}/)[0];
            const text = textPart.slice(1, textPart.length - 1);
            const variables = Variable.getVariablesFromText(text);
            const commands = ((line.content.slice(textPart.length).trim().match(Command.matchMultipleExp) || [])
                .map(command => Command.tryParse({ content: command, number: line.number } as Line)))
                .filter(command => command != null);
            return new Option(line, text, commands, variables);
        } catch (error) {
            handleErrors(error, line);
        }
    }
}

function handleErrors(error: any, line: Line) {
    if (error instanceof UnexpectedSymbolError) {
        error.line = line;
        throw error;
    } else
    if (error instanceof NovelParsingError) {
        error.line = line;
        throw error;
    } else {
        throw new NovelParsingError(error.message, line);
    }
}
