export enum Type {
    None = "none",
    String = "string",
    Numerical = "number",
    Variable = "variable",
    BlockReference = "block_reference",
    Any = "any"
}
export class MultiType {
    types: Type[];
    constructor(...types: Type[]) {
        this.types = types;
    }
    toString(): string {
        return this.types.join(" | ");
    }
}

export default class Value {
    value: any = undefined;

    readonly type: Type = Type.None;
    static readonly inlineExp = /.\ba/;

    constructor() {}
}

import UnexpectedSymbolError from "../errors/UnexpectedSymbolError";
import BlockReference from "./BlockReference";
import Numerical from "./Numerical";
import String from "./String";
import Variable from "./Variable";

export function stringToValues(str: string): Value[] {
    const values = []; 
    while (str.length > 0) {
        str = str.trim();
        let didMatch = false;
        for (let type of inlineTypes) {
            let regex = typeToInlineRegex(type);
            const match = str.match(regex);
            if (match) {
                didMatch = true;
                values.push(
                    strToValueOfType(match[0], type)
                );
                str = str.slice(match[0].length);
                break;
            }
        }
        if (!didMatch) {
            throw new UnexpectedSymbolError(str[0]);
        }
    }
    return values;
}

function typeToInlineRegex(type: Type): RegExp {
    switch (type) {
        case Type.String:
            return String.inlineExp;
        case Type.Numerical:
            return Numerical.inlineExp;
        case Type.BlockReference:
            return BlockReference.inlineExp;
        case Type.Variable:
            return Variable.inlineExp;
        default:
            return Value.inlineExp;
    }
}

function strToValueOfType(str: string, type: Type): Value {
    switch (type) {
        case Type.String:
            return new String(str.slice(1, str.length - 1));
        case Type.Numerical:
            return new Numerical(Number.parseFloat(str));
        case Type.BlockReference:
            return new BlockReference(str.slice(1));
        case Type.Variable:
            return new Variable(str.slice(1));
        default:
            return new Value();
    }
}

const inlineTypes: Type[] = [Type.String, Type.Numerical, Type.BlockReference, Type.Variable];
