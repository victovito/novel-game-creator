import ScopeEnclosingError from "../errors/ScopeEnclosingError";
import Expression from "../expressions/Expression";
import Line from "../structural/Line";

export default class Scope {
    starting: Line;
    ending: Line;
    innerText: Line[] = [];

    constructor(starting?: Line, ending?: Line, innerText?: Line[]) {
        this.starting = starting;
        this.ending = ending;
        this.innerText = innerText ?? [];
    }

    get orderedElements(): (Expression | Scope)[] {
        return this.getOrderedElements();
    }

    static generateScopes(lines: Line[], startExp: RegExp, endExp: RegExp): Scope[] {
        const scopes: Scope[] = [];

        let scope: Scope;
        let insideScope = false;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            if (!insideScope) {
                let match = line.content.match(startExp);
                if (match) {
                    scope = new Scope();
                    scope.starting = line;
                    insideScope = true;
                    continue;
                }
            } else {
                let match = line.content.match(endExp);
                if (match) {
                    scope.ending = line;
                    scopes.push(scope);
                    insideScope = false;
                    continue;
                } else {
                    match = line.content.match(startExp);
                    if (match) {
                        throw new ScopeEnclosingError(scope.starting.content, line);
                    }
                    scope.innerText.push(line);
                }
            }
        }
        return scopes;
    }

    
    protected getOrderedElements(...elements: (Expression | Scope)[]): (Expression | Scope)[] {
        return elements.sort((a, b) => {
            return (
                a instanceof Expression ? a.line.number : a.starting.number
            ) - (
                b instanceof Expression ? b.line.number : b.starting.number
            );
        });
    }

    processScope(): void { }
}
