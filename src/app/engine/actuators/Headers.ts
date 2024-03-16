import BlockNotDefinedError from "../errors/parsing/BlockNotDefinedError";
import InvalidHeaderError from "../errors/parsing/InvalidHeaderError";
import NovelParsingError from "../errors/parsing/NovelParsingError";
import UnsupportedFileTypeError from "../errors/parsing/UnsupportedFileTypeError";
import Novel from "../objects/Novel";
import AudioResource from "../resources/AudioResource";
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
    const reference = (args[0] as BlockReference).value;
    const block = novel.getBlock(reference);
    if (!block) {
        throw new BlockNotDefinedError(reference);
    }
    novel.entry = block;
}

function define(novel: Novel, ...args: Value[]) {
    validateArguments([Type.Variable, new MultiType(Type.String, Type.Numerical)], args);
    const variable = args[0] as Variable;
    const value = args[1] as Value;
    novel.variables.set(variable.value, value);
}

function preload(novel: Novel, ...args: Value[]) {
    validateArguments([Type.String, Type.Variable], args);
    const path = (args[0] as String).value;
    const variable = args[1] as Variable;
    const extension = path.match(/.[a-z0-9]+$/);
    if (!extension) {
        throw new NovelParsingError("cade");
    }
    const name = path.match(/[^\\/:*?"<>|\r\n]+$/)[0].replace(extension[0], "");
    if ([".mp3", ".wav"].indexOf(extension[0]) > -1) {
        const audio = new AudioResource(name, path);
        novel.variables.set(variable.value, audio);
    } else
    if ([".png", ".jpeg", ".jpg"].indexOf(extension[0]) > -1) {
        novel.variables.set(variable.value, null);
    } else {
        throw new UnsupportedFileTypeError(extension[0]);
    }
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

