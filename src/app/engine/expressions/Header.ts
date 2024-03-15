import Expression from "./Expression";
import Line from "../structural/Line";
import Value, { stringToValues } from "../values/Value";
import NovelParsingError from "../errors/parsing/NovelParsingError";
import UnexpectedSymbolError from "../errors/parsing/UnexpectedSymbolError";

export default class Header extends Expression {
    identifier: string;
    args: Value[] = [];
    
    constructor(line: Line, identifier: string, args: Value[]) {
        super(line);
        this.identifier = identifier;
        this.args = args;
    }

    static readonly matchExp = /^[A-Z]+\b.*$/i;

    static override tryParse(line: Line): Header {
        try {
            const match = line.content.match(this.matchExp);
            if (!match) return null;
            const identifier = match[0].match(/^[A-Z]+\b/i)[0];
            const args = stringToValues(line.content.slice(identifier.length));
            return new Header(line, identifier, args);
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
