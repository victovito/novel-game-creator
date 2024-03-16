import Line from "../../structural/Line";
import NovelParsingError from "./NovelParsingError";

export default class BlockNotDefinedError extends NovelParsingError {
    message: string;
    line: Line;
    constructor(reference: string, line?: Line) {
        super(`Block '#${reference}' is not defined`, line);
    }
}