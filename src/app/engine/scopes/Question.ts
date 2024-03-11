import Scope from "./Scope";
import Line from "../structural/Line";
import Option from "../expressions/Option";
import Expression from "../expressions/Expression";
import UnexpectedSymbolError from "../errors/UnexpectedSymbolError";
import ScopeDeclarationError from "../errors/ScopeDeclarationError";

export default class Question extends Scope {
    options: Option[];
    
    constructor(scope: Scope) {
        super(scope.starting, scope.ending, scope.innerText);
    }
    
    override get orderedElements(): (Scope | Expression)[] {
        return this.getOrderedElements(...this.options);
    }
    
    static readonly startExp = /^\?$/i;
    static readonly endExp = /^\?$/i;
    
    static override generateScopes(lines: Line[]): Question[] {
        const questions = Scope.generateScopes(lines, this.startExp, this.endExp).map(scope => new Question(scope));
        questions.forEach(question => question.processScope());
        return questions;
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
            throw new ScopeDeclarationError("Questions must have at least one option", this.ending);
        }
    }
}
