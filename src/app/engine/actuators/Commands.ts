import InvalidCommandError from "../errors/runtime/InvalidCommandError";
import InvalidResourceTypeError from "../errors/runtime/InvalidResourceTypeError";
import NovelRuntimeError from "../errors/runtime/NovelRuntimeError";
import UnexpectedArgumentError from "../errors/runtime/UnexpectedArgumentError";
import VariableNotDeclaredError from "../errors/runtime/VariableNotDeclaredError";
import Novel from "../objects/Novel";
import AudioResource from "../resources/AudioResource";
import Resource, { ResourceType } from "../resources/Resource";
import BlockReference from "../values/BlockReference";
import Value, { Type } from "../values/Value";
import Variable from "../values/Variable";
import { validateArguments } from "./Actuator";

function goto(novel: Novel, ...args: Value[]) {
    validateArguments([Type.BlockReference], args);
    const blockRef = args[0] as BlockReference;
    const block = novel.blocks.get(blockRef.value);
    if (!block) {
        throw new NovelRuntimeError(`Block '#${blockRef.value}' not found`);
    }
    novel.events.gotoBlock.emit(block);
}

function play(novel: Novel, ...args: Value[]) {
    validateArguments([Type.Variable], args);
    const variable = args[0] as Variable;
    const resource = getAudioResource(novel, variable);
    novel.audioManager.play(resource);
}

function loop(novel: Novel, ...args: Value[]) {
    validateArguments([Type.Variable], args);
    const variable = args[0] as Variable;
    const resource = getAudioResource(novel, variable);
    novel.audioManager.loop(resource);
}

function pause(novel: Novel, ...args: Value[]) {
    validateArguments([Type.Variable], args);
    const variable = args[0] as Variable;
    const resource = getAudioResource(novel, variable);
    novel.audioManager.pause(resource);
}

function stop(novel: Novel, ...args: Value[]) {
    validateArguments([Type.Variable], args);
    const variable = args[0] as Variable;
    const resource = getAudioResource(novel, variable);
    novel.audioManager.stop(resource);
}

function set(novel: Novel, ...args: Value[]) {
    validateArguments([Type.Variable, Type.Any], args);
    const variable = args[0] as Variable;
    const value = novel.variables.get(variable.value);
    if (value instanceof Resource) {
        throw new NovelRuntimeError(`Can't set the value of '$${variable}' because it's a resource`);
    }
    let newValue: Value | Resource = args[1];
    while (newValue.type == Type.Variable) {
        newValue = novel.variables.get(newValue.value);
    }
    if (newValue instanceof Resource) {
        throw new NovelRuntimeError(`Can't set the value of '$${variable}' to a resource`);
    }
    if (value.type != newValue.type) {
        throw new UnexpectedArgumentError(UnexpectedArgumentError.buildMessage(value.type, newValue.type));
    }
    setVariable(novel, variable.value, newValue);
}

const commands = new Map<string, (novel: Novel, ...args: Value[]) => void>([
    ["goto", goto],
    ["play", play],
    ["loop", loop],
    ["pause", pause],
    ["stop", stop],
    ["set", set],
]);

export default function getCommandFunction(identifier: string): (novel: Novel, ...args: Value[]) => void {
    const command = commands.get(identifier);
    if (!command) {
        //hoff
        throw new InvalidCommandError(identifier);
    }
    return command;
}

function getAudioResource(novel: Novel, variable: Variable): AudioResource {
    const audio = novel.variables.get(variable.value);
    if (!audio) {
        throw new VariableNotDeclaredError(variable.value);
    }
    if (!(audio instanceof AudioResource)) {
        if (audio instanceof Value) {
            throw new InvalidResourceTypeError(audio.type, ResourceType.Audio);
        } else {
            throw new InvalidResourceTypeError(audio.type, ResourceType.Audio)
        }
    }
    return audio;
}

function setVariable(novel: Novel, reference: string, value: Value) {
    novel.variables.set(reference, value);
    novel.events.variableUpdated.emit({ reference, value });
}
