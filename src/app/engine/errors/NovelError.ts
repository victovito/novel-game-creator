import Line from "../structural/Line";

export default class NovelError {
    message: string;
    line: Line;

    constructor(message: string, line?: Line) {
        this.message = message;
        this.line = line;
    }
}