import Line from "../../structural/Line";
import NovelParsingError from "./NovelParsingError";

export default class FileNotFoundError extends NovelParsingError {
    message: string;
    line: Line;
    constructor(path: string, line?: Line) {
        super(`File '${path}' was not found. Make sure the path is relative to your .novel file`, line);
    }
}