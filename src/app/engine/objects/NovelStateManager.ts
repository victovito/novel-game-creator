import Novel from "./Novel";
import Block from "../scopes/Block";
import Dialog from "../scopes/Dialog";
import Text from "../expressions/Text";
import Question from "../scopes/Question";
import Value from "../values/Value";

export interface INovelState {
    block: INovelBlockState;
    variables: INovelVariableState[];
}

export interface INovelBlockState {
    reference: string;
    dialog: INovelDialogState;
}

export interface INovelDialogState {
    index: number;
    childIndex: number;
}

export interface INovelVariableState {
    reference: string;
    value: Value;
}

export default class NovelStateManager {
    novel: Novel;
    state: INovelState;

    constructor(novel: Novel, state?: INovelState) {
        this.novel = novel;
        if (!novel) return;
        if (state && Object.keys(state).length > 0) {
            this.state = state;
            this.applyStateVariables();
        } else {
            this.initEmptyState();
        }
    }

    get currentBlock(): Block {
        return this.novel?.getBlock(this.state.block.reference);
    }

    get currentDialog(): Dialog {
        return this.currentBlock?.renderElements[this.state.block.dialog.index];
    }

    get currentTextOrQuestion(): Text | Question {
        return this.currentDialog?.renderElements[this.state.block.dialog.childIndex] as (Text | Question);
    }

    nextDialog() {
        this.state.block.dialog.index++;
    }

    nextTextOrQuestion() {
        if (!this.currentDialog) return
        if (this.currentDialog.renderElements.length == this.state.block.dialog.childIndex + 1) {
            this.nextDialog();
            this.state.block.dialog.childIndex = 0;
        } else {
            this.state.block.dialog.childIndex++;
        }
    }

    updateVariables() {
        this.state.variables = this.fromNovelVariables();
    }

    private initEmptyState() {
        const block = this.novel.entry || Array.from(this.novel.blocks.values())[0];
        this.state = {
            block: {
                reference: block.reference,
                dialog: {
                    index: 0,
                    childIndex: 0
                }
            },
            variables: this.fromNovelVariables()
        }
    }

    private applyStateVariables() {
        if (!this.state.variables) return;
        this.state.variables.forEach(variable => {
            const original = this.novel.variables.get(variable.reference);
            original.value = variable.value.value;
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
