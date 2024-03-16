import NovelRuntimeError from "../errors/runtime/NovelRuntimeError";
import { INovelVariableState } from "../objects/NovelState";
import AudioResource from "../resources/AudioResource";
import Block from "../scopes/Block";
import Event from "./Event";

export default class NovelEvents {
    onRuntimeError: Event<NovelRuntimeError> = new Event<NovelRuntimeError>();
    variableUpdated: Event<INovelVariableState> = new Event<INovelVariableState>();
    gotoBlock: Event<Block> = new Event<Block>();
    preloadResource: Event<AudioResource> = new Event<AudioResource>();
    playSound: Event<AudioResource> = new Event<AudioResource>();
    stopSound: Event<AudioResource> = new Event<AudioResource>();
    constructor() { }
    clear() {
        Object.values(this).forEach(event => {
            if (event instanceof Event) {
                event.clear();
            }
        })
    }
}