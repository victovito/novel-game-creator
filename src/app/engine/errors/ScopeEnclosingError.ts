import Line from "../structural/Line";
import NovelParsingError from "./NovelParsingError";

export default class ScopeEnclosingError extends NovelParsingError {
    message: string;
    line: Line;
}