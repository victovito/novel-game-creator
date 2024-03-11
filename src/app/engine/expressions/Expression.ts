import Line from "../structural/Line";

export default class Expression {
    line: Line;

    constructor(line: Line) {
        this.line = line;
    }

    static readonly argsExp = /("[^"]*")|([#$][a-z_]+[a-z0-9_]*)|([0-9]*\.{1}[0-9]+)|([0-9]+)/gi;

    static tryParse(line: Line): Expression { return new Expression(line) }
}
