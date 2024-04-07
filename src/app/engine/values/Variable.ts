import Value, { Type } from "./Value";

export default class Variable extends Value {
    value: string;

    override readonly type: Type = Type.Variable;
    static override readonly inlineExp = /^\$[a-z_]+[a-z0-9_]*/;
    static readonly intextExp = /{\$[a-z_]+[a-z0-9_]*}/gi;

    constructor(value: string) {
        super();
        this.value = value;
    }

    static getVariablesFromText(text: string): Variable[] {
        let match = text.match(this.intextExp);
        if (match) {
            if (!(match instanceof Array)) {
                match = [match[0]]
            }
            return match.map(variable => {
                const inner = variable.slice(2, variable.length - 1);
                return new Variable(inner);
            });
        }
        return [];
    } 
}