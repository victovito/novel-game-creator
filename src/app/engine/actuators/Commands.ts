import Novel from "../objects/Novel";
import BlockReference from "../values/BlockReference";
import Value, { Type } from "../values/Value";
import Variable from "../values/Variable";
import { validateArguments } from "./Actuator";

function goto(novel: Novel, ...args: Value[]) {
    validateArguments([Type.BlockReference], args);
    const blockRef = args[0] as BlockReference;
    const block = novel.blocks.get(blockRef.value);
    novel.events.gotoBlock.emit(block);
}

function play(novel: Novel, ...args: Value[]) {
    validateArguments([Type.Variable, Type.Numerical], args, 1);
    const variable = args[0] as Variable;
    const sound = novel.variables.get(variable.value);
    novel.events.playSound.emit(sound.value);
}

function stop(novel: Novel, ...args: Value[]) {
    validateArguments([Type.Variable], args);
    const variable = args[0] as Variable;
    const sound = novel.variables.get(variable.value);
    novel.events.stopSound.emit(sound.value);
}

const commands = new Map<string, (novel: Novel, ...args: Value[]) => void>([
    ["goto", goto],
    ["play", play],
    ["stop", stop],
]);

export default function getCommandFunction(identifier: string): (novel: Novel, ...args: Value[]) => void {
    return commands.get(identifier);
}
