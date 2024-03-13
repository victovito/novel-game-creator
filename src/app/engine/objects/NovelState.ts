import Novel from "./Novel";
import Block from "../scopes/Block";
import Dialog from "../scopes/Dialog";
import Text from "../expressions/Text";
import Choice from "../scopes/Choice";
import Value from "../values/Value";
import Command from "../expressions/Command";

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
    value: Value;
}

export default class NovelState {
    novel: Novel;
    data: INovelStateData;
    next: () => void;

    constructor(novel: Novel, state?: INovelStateData) {
        this.novel = novel;
        if (state && Object.keys(state).length > 0) {
            this.data = state;
            if (novel) this.applyStateVariables();
        } else {
            this.initEmptyState();
        }
    }

    get currentCommand(): Command {
        const blockChild = this.currentBlock?.orderedElements[this.data.block.childIndex];
        if (blockChild && blockChild instanceof Command) {
            return blockChild;
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
        const data: INovelStateData = JSON.parse(JSON.stringify(this.data));
        if (!this.currentDialog || data.block.dialog.childIndex >= this.currentDialog.orderedElements.length - 1) {
            data.block.childIndex++;
            data.block.dialog.childIndex = 0;
        } else {
            data.block.dialog.childIndex++;
        }
        return new NovelState(this.novel, data);
    }

    fromBlock(reference: string): NovelState {
        const state = new NovelState(this.novel);
        state.data.block.reference = reference;
        return state;
    }

    updateVariables() {
        this.data.variables = this.fromNovelVariables();
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
    }

    private applyStateVariables() {
        if (!this.data.variables) return;
        this.data.variables.forEach(variable => {
            const original = this.novel.variables.get(variable.reference);
            if (original) {
                original.value = variable.value.value;
            }
        });
    }

    private fromNovelVariables(): INovelVariableState[] {
        if (!this.novel) return [];
        const variables: INovelVariableState[] = [];
        const keys = Array.from(this.novel.variables.keys());
        keys.forEach((key, index) => {
            const value = this.novel.getVariable(key);
            variables.push({ reference: key, value });
        });
        return variables;
    }
}
