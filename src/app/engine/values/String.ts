import Value, { Type } from "./Value";

export default class String extends Value {
    value: string;

    override readonly type: Type = Type.String;
    static override readonly inlineExp = /^"[^"]*"/;

    constructor(value: string) {
        super();
        this.value = value;
    }
}