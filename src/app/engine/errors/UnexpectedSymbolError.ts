import Line from "../structural/Line";
import NovelParsingError from "./NovelParsingError";

export default class UnexpectedSymbolError extends NovelParsingError {
    message: string;
    line: Line;
    constructor(symbol: string, line?: Line) {
        super(`Symbol '${symbol}' not expected`, line);
    }
}