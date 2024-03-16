import { ResourceType } from "../../resources/Resource";
import Line from "../../structural/Line";
import NovelRuntimeError from "./NovelRuntimeError";

export default class InvalidResourceTypeError extends NovelRuntimeError {
    message: string;
    line: Line;
    constructor(type: string, expected: ResourceType, line?: Line) {
        super(`Wrong resource type: expected '${expected}' but got '${type}'`, line);
    }
}