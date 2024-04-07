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
        text.variables = Variable.getVariablesFromText(text.content);
        return text;
    }
}
