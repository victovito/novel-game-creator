import Expression from "./Expression";
import Line from "../structural/Line";
import Value, { stringToValues } from "../values/Value";
import NovelParsingError from "../errors/NovelParsingError";
import UnexpectedSymbolError from "../errors/UnexpectedSymbolError";

export default class Command extends Expression {
    identifier: string;
    args: Value[] = [];
    
    constructor(line: Line, identifier: string, args: Value[]) {
        super(line);
        this.identifier = identifier;
        this.args = args;
    }

    static readonly matchExp = /^\[[a-z]+[^\[\]]*\]/i;
    static readonly matchMultipleExp = /\[[a-z]+[^\[\]]*\]/ig;

    static override tryParse(line: Line): Command {
        try {
            if (line.content == "") return null;
            const match = line.content.match(this.matchExp);
            if (!match) return null;
            const inner = match[0].slice(1, match[0].length - 1).trim(); 
            const identifier = inner.match(/^[a-z]+\b/i)[0];
            const args = stringToValues(inner.slice(identifier.length));
            return new Command(line, identifier, args);
        } catch (error) {
            handleErrors(error, line);
        }
    }
}

function handleErrors(error: any, line: Line) {
    if (error instanceof UnexpectedSymbolError) {
        error.line = line;
        throw error;
    } else {
        throw new NovelParsingError(error.message, line);
    }
}
