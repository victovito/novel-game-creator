import Scope from "./Scope";
import Line from "../structural/Line";
import Option from "../expressions/Option";
import Expression from "../expressions/Expression";
import UnexpectedSymbolError from "../errors/parsing/UnexpectedSymbolError";
import ScopeDeclarationError from "../errors/parsing/ScopeDeclarationError";

export default class Choice extends Scope {
    options: Option[];
    
    constructor(scope: Scope) {
        super(scope.starting, scope.ending, scope.innerText);
    }
    
    override get orderedElements(): (Scope | Expression)[] {
        return this.getOrderedElements(...this.options);
    }
    
    override get renderElements(): Option[] {
        return this.getOrderedElements(...this.options) as Option[];
    }
    
    static readonly startExp = /^\?$/i;
    static readonly endExp = /^\?$/i;
    
    static override generateScopes(lines: Line[]): Choice[] {
        const choices = Scope.generateScopes(lines, this.startExp, this.endExp).map(scope => new Choice(scope));
        choices.forEach(choice => choice.processScope());
        return choices;
    }
        
    override processScope(): void {
        this.options = this.innerText.map(line => Option.tryParse(line)).filter(line => line != null);
        this.validateScope();
    }
    
    private validateScope() {
        const rootLines = this.innerText.map(x => x);
        this.options.forEach(option => {
            rootLines.splice(rootLines.indexOf(option.line), 1);
        });
        rootLines.forEach(line => {
            if (line.content != "") {
                throw new UnexpectedSymbolError(line.content[0], line);
            }
        });
        if (this.options.length == 0) {
            throw new ScopeDeclarationError("Choices must have at least one option", this.ending);
        }
    }
}
