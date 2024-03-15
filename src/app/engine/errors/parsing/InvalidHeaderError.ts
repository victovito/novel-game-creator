import Line from "../../structural/Line";
import NovelParsingError from "./NovelParsingError";

export default class InvalidHeaderError extends NovelParsingError {
    message: string;
    line: Line;
    constructor(identifier: string, line?: Line) {
        super(`'${identifier}' is not a valid header`, line);
    }
}