import Expression from "./Expression";
import Line from "../structural/Line";
import Variable from "../values/Variable";

export default class Text extends Expression {
    content: string;
    variables: Variable[] = [];
    
    constructor(line: Line, content: string) {
        super(line);
        this.content = content;
    }

    static readonly variableExp = /{\$[a-z_]+[a-z0-9_]*}/gi;

    static override tryParse(line: Line): Text {
        const text = new Text(line, line.content);
        let match = text.content.match(this.variableExp);
        if (match) {
            if (!(match instanceof Array)) {
                match = [match[0]]
            }
            text.variables = match.map(variable => {
                const inner = variable.slice(1, variable.length - 1);
                return new Variable(inner);
            })
        }
        return text;
    }
}
