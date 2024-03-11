import Line from "../structural/Line";

export default class NovelParsingError {
    message: string;
    line: Line;

    constructor(message: string, line?: Line) {
        this.message = message;
        this.line = line;
    }
}