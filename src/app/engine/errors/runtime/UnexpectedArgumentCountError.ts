import Line from "../../structural/Line";
import NovelRuntimeError from "./NovelRuntimeError";

export default class UnexpectedArgumentCountError extends NovelRuntimeError {
    message: string;
    line: Line;
    constructor(expected: number | string, actual: number, line?: Line) {
        super(`Expected ${expected} arguments, but got ${actual} instead`, line);
    }
}