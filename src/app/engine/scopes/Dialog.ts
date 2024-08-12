import Scope from "./Scope";
import Line from "../structural/Line";
import Choice from "./Choice";
import Command from "../expressions/Command";
import Expression from "../expressions/Expression";
import Text from "../expressions/Text";
import UnexpectedSymbolError from "../errors/parsing/UnexpectedSymbolError";
import Variable from "../values/Variable";

export default class Dialog extends Scope {
    speaker: string | null;
    texts: Text[] = [];
    commands: Command[] = [];
    choices: Choice[] = [];
    speakerVariables: Variable[];

    constructor(scope: Scope) {
        super(scope.starting, scope.ending, scope.innerText);
    }

    override get orderedElements(): (Scope | Expression)[] {
        return this.getOrderedElements(...this.texts, ...this.commands, ...this.choices);
    }
    
    override get renderElements(): (Scope | Expression)[] {
        return this.getOrderedElements(...this.texts, ...this.choices);
    }

    static readonly startExp = /^@.*("[^"]*")?.*$/i;
    static readonly endExp = /^@$/i;
    static readonly speakerExp = /^"[^"]*"/;

    static override generateScopes(lines: Line[]): Dialog[] {
        const dialogs = Scope.generateScopes(lines, this.startExp, this.endExp).map(scope => new Dialog(scope));
        dialogs.forEach(dialog => dialog.processScope());
        return dialogs;
    }
    
    override processScope(): void {
        this.speaker = this.getSpeaker();
        this.speakerVariables = Variable.getVariablesFromText(this.speaker);
        this.choices = Choice.generateScopes(this.innerText);
        const rootLines = this.innerText.map(x => x);
        this.choices.forEach(choice => {
            rootLines.splice(this.innerText.indexOf(choice.starting), choice.innerText.length + 2);
        });
        this.commands = rootLines.map(line => Command.tryParse(line)).filter(line => line != null);
        this.commands.forEach(command => {
            rootLines.splice(rootLines.indexOf(command.line), 1);
        });
        this.texts = rootLines.filter(line => line.content != "").map(line => Text.tryParse(line));
    }

    private getSpeaker(): string {
        if (this.starting.content.length == 1) return;
        const inner = this.starting.content.slice(1).trim();
        const match = inner.match(Dialog.speakerExp);
        if (!match) {
            throw new UnexpectedSymbolError(inner[0], this.starting);
        }
        if (match[0] != inner) {
            throw new UnexpectedSymbolError(inner.slice(match[0].length).trim()[0], this.starting);
        }
        return match[0].slice(1, match[0].length - 1);
    }
}
