import Line from "../../structural/Line";
import { MultiType, Type } from "../../values/Value";
import NovelParsingError from "./NovelParsingError";
export default class UnexpectedArgumentError extends NovelParsingError {
    message: string;
    line: Line;
    static buildMessage(expected: Type | MultiType, actual: Type) {
        return `Unexpected argument type: expected '${expected}' but got '${actual}' instead`;
    }
}