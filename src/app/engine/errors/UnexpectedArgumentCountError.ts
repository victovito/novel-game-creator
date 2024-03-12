import Line from "../structural/Line";
import { Type } from "../values/Value";
import NovelParsingError from "./NovelParsingError";

export default class UnexpectedArgumentCountError extends NovelParsingError {
    message: string;
    line: Line;
    constructor(expected: number | string, actual: number, line?: Line) {
        super(`Expected ${expected} arguments, but got ${actual} instead`, line);
    }
}