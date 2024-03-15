import InvalidHeaderError from "../errors/parsing/InvalidHeaderError";
import Novel from "../objects/Novel";
import BlockReference from "../values/BlockReference";
import String from "../values/String";
import Value, { MultiType, Type } from "../values/Value";
import Variable from "../values/Variable";
import { validateArguments } from "./Actuator";

function title(novel: Novel, ...args: Value[]) {
    validateArguments([Type.String], args);
    novel.title = (args[0] as String).value;
}

function author(novel: Novel, ...args: Value[]) {
    validateArguments([Type.String], args);
    novel.author = (args[0] as String).value;
}

function entry(novel: Novel, ...args: Value[]) {
    validateArguments([Type.BlockReference], args);
    novel.entry = novel.getBlock((args[0] as BlockReference).value);
}

function define(novel: Novel, ...args: Value[]) {
    validateArguments([Type.Variable, new MultiType(Type.String, Type.Numerical)], args);
    const variable = args[0] as Variable;
    const value = args[1] as Value;
    novel.variables.set(variable.value, value);
}

function preload(novel: Novel, ...args: Value[]) {
    validateArguments([Type.String, Type.Variable], args);
    const path = args[0] as String;
    const variable = args[1] as Variable;
    novel.variables.set(variable.value, path);
}

function lock(novel: Novel, ...args: Value[]) {
    validateArguments([], args);
    novel.locked = true;
}

const headers = new Map<string, (novel: Novel, ...args: Value[]) => void>([
    ["TITLE", title],
    ["AUTHOR", author],
    ["ENTRY", entry],
    ["DEFINE", define],
    ["PRELOAD", preload],
    ["LOCK", lock],
]);

export default function getHeaderFunction(identifier: string): (novel: Novel, ...args: Value[]) => void {
    const header = headers.get(identifier);
    if (!header) {
        throw new InvalidHeaderError(identifier);
    }
    return header;
}

