import Line from "../../structural/Line";
import NovelError from "../NovelError";

export default class NovelRuntimeError extends NovelError {
    message: string;
    line: Line;

    constructor(message: string, line?: Line) {
        super(message, line);
    }
}