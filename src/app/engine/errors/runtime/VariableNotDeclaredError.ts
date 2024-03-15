import Line from "../../structural/Line";
import NovelRuntimeError from "./NovelRuntimeError";

export default class VariableNotDeclaredError extends NovelRuntimeError {
    message: string;
    line: Line;
    constructor(reference: string, line?: Line) {
        super(`The variable '$${reference}' was not declared`, line);
    }
}