import Line from "../../structural/Line";
import { MultiType, Type } from "../../values/Value";
import NovelRuntimeError from "./NovelRuntimeError";

export default class UnexpectedArgumentError extends NovelRuntimeError {
    message: string;
    line: Line;
    static buildMessage(expected: Type | MultiType, actual: Type) {
        return `Unexpected argument type: expected '${expected}' but got '${actual}' instead`;
    }
}