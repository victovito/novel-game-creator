import Line from "../structural/Line";
import NovelParsingError from "./NovelParsingError";

export default class InvalidCommandError extends NovelParsingError {
    message: string;
    line: Line;
    constructor(identifier: string, line?: Line) {
        super(`'${identifier}' is not a valid command`, line);
    }
}