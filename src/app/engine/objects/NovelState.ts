import Novel from "./Novel";
import Block from "../scopes/Block";
import Dialog from "../scopes/Dialog";
import Text from "../expressions/Text";
import Choice from "../scopes/Choice";
import Value from "../values/Value";
import Command from "../expressions/Command";
import Resource from "../resources/Resource";

export interface INovelStateData {
    block: INovelBlockState;
    variables: INovelVariableState[];
}

export interface INovelBlockState {
    reference: string;
    childIndex: number;
    dialog: INovelDialogState;
}

export interface INovelDialogState {
    childIndex: number;
}

export interface INovelVariableState {
    reference: string;
    value: Value | Resource;
}

export default class NovelState {
    novel: Novel;
    data: INovelStateData;
    next: () => void;
    private _prevCommands: Command[] = [];

    constructor(novel: Novel, data?: INovelStateData) {
        this.novel = novel;
        if (data && Object.keys(data).length > 0) {
            this.data = data;
            if (novel) this.applyStateVariables();
        } else {
            this.initEmptyState();
        }
    }

    get previousCommands() {
        return this._prevCommands;
    }

    get currentCommand(): Command {
        const blockChild = this.currentBlock?.orderedElements[this.data.block.childIndex];
        if (blockChild && blockChild instanceof Command) {
            return blockChild;
        }
        if (blockChild && blockChild instanceof Dialog) {
            const dialogChild = this.currentDialog.orderedElements[this.data.block.dialog.childIndex];
            if (dialogChild && dialogChild instanceof Command) {
                return dialogChild;
            }
        }
    }

    get currentBlock(): Block {
        return this.novel?.getBlock(this.data.block.reference);
    }

    get currentDialog(): Dialog {
        const dialog = this.currentBlock?.orderedElements[this.data.block.childIndex];
        if (dialog && dialog instanceof Dialog) {
            return dialog;
        }
    }

    get currentTextOrChoice(): Text | Choice {
        const textOrChoice = this.currentDialog?.orderedElements[this.data.block.dialog.childIndex];
        if (textOrChoice && (textOrChoice instanceof Text || textOrChoice instanceof Choice)) {
            return textOrChoice;
        }
    }

    onNext(next: () => void) {
        this.next = next;
    }

    nextState(): NovelState {
        function getNextElement(state: NovelState) {
            const data: INovelStateData = JSON.parse(JSON.stringify(state.data));
            if (!state.currentDialog || data.block.dialog.childIndex >= state.currentDialog.orderedElements.length - 1) {
                data.block.childIndex++;
                data.block.dialog.childIndex = 0;
            } else {
                data.block.dialog.childIndex++;
            }
            return new NovelState(state.novel, data);
        }
        const commands: Command[] = [];
        let state: NovelState = getNextElement(this);
        while (state.currentCommand) {
            commands.push(state.currentCommand);
            state = getNextElement(state);
        }
        state._prevCommands = commands;
        return state;
    }

    fromBlock(reference: string): NovelState {
        const data = {
            block: {
                reference: reference,
                childIndex: 0,
                dialog: {
                    childIndex: 0
                }
            },
            variables: this.fromNovelVariables(),
        };
        const state = new NovelState(this.novel, data);
        this.applyPrevCommands(state);
        return state;
    }

    updatedVariables(): NovelState {
        const data = {...this.data};
        data.variables = this.fromNovelVariables();
        const state = new NovelState(this.novel, data);
        return state;
    }

    private initEmptyState() {
        if (!this.novel) return;
        const block = this.novel.entry || Array.from(this.novel.blocks.values())[0];
        this.data = {
            block: {
                reference: block.reference,
                childIndex: 0,
                dialog: {
                    childIndex: 0
                }
            },
            variables: this.fromNovelVariables(),
        };
        this.applyPrevCommands(this);
    }

    private applyPrevCommands(state: NovelState) {
        if (state.currentCommand) {
            const newState = state.nextState();
            state._prevCommands = [state.currentCommand, ...newState._prevCommands];
            state.data = newState.data;
        }
    }

    private applyStateVariables() {
        if (!this.data.variables) return;
        this.data.variables.forEach(variable => {
            const original = this.novel.variables.get(variable.reference);
            if (original) {
                if (original instanceof Value) {
                    original.value = (variable.value as Value).value;
                } else
                if (original instanceof Resource) {
                    original.name = (variable.value as Resource).name;
                    original.path = (variable.value as Resource).path;
                }
            }
        });
    }

    private fromNovelVariables(): INovelVariableState[] {
        if (!this.novel) return [];
        const variables: INovelVariableState[] = [];
        const keys = Array.from(this.novel.variables.keys());
        keys.forEach(key => {
            const value = this.novel.getVariable(key);
            variables.push({ reference: key, value });
        });
        return variables;
    }
}
