import Line from "../../structural/Line";
import NovelRuntimeError from "./NovelRuntimeError";

export default class InvalidCommandError extends NovelRuntimeError {
    message: string;
    line: Line;
    constructor(identifier: string, line?: Line) {
        super(`'${identifier}' is not a valid command`, line);
    }
}