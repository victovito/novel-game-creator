import Line from "../../structural/Line";
import NovelParsingError from "./NovelParsingError";

export default class ScopeDeclarationError extends NovelParsingError {
    message: string;
    line: Line;
}