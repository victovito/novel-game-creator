import Line from "../structural/Line";
import NovelParsingError from "./NovelParsingError";

export default class InvalidHeaderError extends NovelParsingError {
    message: string;
    line: Line;
    static buildMessage(identifier: string) {
        return `'${identifier}' is not a valid header`;
    }
}