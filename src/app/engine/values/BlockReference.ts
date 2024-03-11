import Value, { Type } from "./Value";

export default class BlockReference extends Value {
    value: string;

    override readonly type: Type = Type.BlockReference;
    static override readonly inlineExp = /^#[a-z_]+[a-z0-9_]*/;

    constructor(value: string) {
        super();
        this.value = value;
    }
}