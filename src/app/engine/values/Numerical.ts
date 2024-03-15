import Value, { Type } from "./Value";

export default class Numerical extends Value {
    value: number;

    override readonly type: Type = Type.Numerical;
    static override readonly inlineExp = /^-?[0-9]+(\.[0-9]+)?/;

    constructor(value: number) {
        super();
        this.value = value;
    }
}