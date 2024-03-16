import Line from "../../structural/Line";
import NovelParsingError from "./NovelParsingError";

export default class UnsupportedFileTypeError extends NovelParsingError {
    message: string;
    line: Line;
    constructor(type: string, line?: Line) {
        super(`File type '${type}' is not supported. Supported types are: '.wav', '.mp3', '.png' and '.jpeg'`, line);
    }
}