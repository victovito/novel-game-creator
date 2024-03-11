import Line from "../structural/Line";
import { Type } from "../values/Value";
import NovelParsingError from "./NovelParsingError";

export default class UnexpectedArgumentCountError extends NovelParsingError {
    message: string;
    line: Line;
    static buildMessage(expected: number, actual: number) {
        return `Expected '${expected}' arguments, but got '${actual}' instead`;
    }
}