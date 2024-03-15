import NovelRuntimeError from "../errors/runtime/NovelRuntimeError";
import { INovelVariableState } from "../objects/NovelState";
import Block from "../scopes/Block";
import Event from "./Event";

export default class NovelEvents {
    onRuntimeError: Event<NovelRuntimeError> = new Event<NovelRuntimeError>();
    variableUpdated: Event<INovelVariableState> = new Event<INovelVariableState>();
    gotoBlock: Event<Block> = new Event<Block>();
    preloadResource: Event<string> = new Event<string>();
    playSound: Event<string> = new Event<string>();
    stopSound: Event<string> = new Event<string>();
    constructor() { }
    clear() {
        Object.values(this).forEach(event => {
            if (event instanceof Event) {
                event.clear();
            }
        })
    }
}