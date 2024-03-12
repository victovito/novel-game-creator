import { INovelVariableState } from "../objects/NovelStateManager";
import Block from "../scopes/Block";
import Event from "./Event";

export default class NovelEvents {
    variableUpdated: Event<INovelVariableState> = new Event<INovelVariableState>();
    gotoBlock: Event<Block> = new Event<Block>();
    preloadResource: Event<string> = new Event<string>();
    playSound: Event<string> = new Event<string>();
    stopSound: Event<string> = new Event<string>();
    constructor() { }
}