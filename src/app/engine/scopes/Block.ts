import Scope from "./Scope";
import Line from "../structural/Line";
import Dialog from "./Dialog";
import Command from "../expressions/Command";
import Expression from "../expressions/Expression";
import ScopeDeclarationError from "../errors/ScopeDeclarationError";
import ScopeEnclosingError from "../errors/ScopeEnclosingError";
import NovelParsingError from "../errors/NovelParsingError";
import UnexpectedSymbolError from "../errors/UnexpectedSymbolError";

export default class Block extends Scope {
    reference: string;
    dialogs: Dialog[] = [];
    commands: Command[] = [];

    constructor(scope: Scope) {
        super(scope.starting, scope.ending, scope.innerText);
    }
    
    override get orderedElements(): (Scope | Expression)[] {
        return this.getOrderedElements(...this.dialogs, ...this.commands);
    }

    override get renderElements(): Dialog[] {
        return this.getOrderedElements(...this.dialogs) as Dialog[];
    }

    static readonly startExp = /^#(.*)?/i;
    static readonly endExp = /^#$/i;

    static override generateScopes(lines: Line[]): Block[] {
        try {
            const blocks = Scope.generateScopes(lines, this.startExp, this.endExp).map(scope => new Block(scope));
            blocks.forEach(block => {
                block.processScope()
            });
            return blocks;
        } catch (error) {
            handleErrors(error);
        }
    }

    override processScope(): void {
        this.reference = this.starting.content.slice(1);
        this.validateName();
        this.dialogs = Dialog.generateScopes(this.innerText);
        const rootLines = this.innerText.map(x => x);
        this.dialogs.forEach(dialog => {
            rootLines.splice(rootLines.indexOf(dialog.starting), dialog.innerText.length + 2);
        });
        this.commands = rootLines.map(line => Command.tryParse(line)).filter(line => line != null);
        this.commands.forEach(command => {
            rootLines.splice(rootLines.indexOf(command.line), 1);
        });
        rootLines.forEach(line => {
            if (line.content != "") {
                throw new UnexpectedSymbolError(line.content[0], line);
            }
        });
    }

    validateName() {
        if (this.reference == "") throw new ScopeDeclarationError("You must assign a name to a block", this.starting);
        if (this.reference.match(/ /)) throw new ScopeDeclarationError("A block name must not contain spaces", this.starting);
        if (this.reference.match(/^[0-9]/)) throw new ScopeDeclarationError("A block name must not start with a number", this.starting);
        if (!this.reference.match(/^[a-z]+[a-z0-9_]*$/)) throw new ScopeDeclarationError("You can only use letters and numbers to name a block", this.starting);
    }
}

function handleErrors(error: any) {
    if (error instanceof ScopeEnclosingError) {
        throw new ScopeEnclosingError(`Block '${error.message}' was not closed before trying to creating a new block`, error.line);
    } else
    if (error instanceof ScopeDeclarationError) {
        throw error;
    } else
    if (error instanceof NovelParsingError) {
        throw error;
    } else {
        throw new NovelParsingError(error.message, null);
    }
}

