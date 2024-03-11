import UnexpectedArgumentCountError from "../errors/UnexpectedArgumentCountError";
import UnexpectedArgumentError from "../errors/UnexpectedArgumentError";
import Value, { Type, MultiType } from "../values/Value";

export function validateArguments(expected: (Type | MultiType)[], args: Value[]) {
    if (args.length != expected.length) {
        throw new UnexpectedArgumentCountError(UnexpectedArgumentCountError.buildMessage(expected.length, args.length), null);
    }
    for (let i = 0; i < expected.length; i++) {
        const arg = expected[i];
        const actual = args[i];
        if (arg instanceof MultiType) {
            let valid = false;
            arg.types.forEach((type) => {
                if (actual.type == type) valid = true;
            });
            if (!valid) {
                throw new UnexpectedArgumentError(UnexpectedArgumentError.buildMessage(arg, actual.type), null);
            }
        } else {
            if (arg == Type.Any) break;
            if (arg != actual.type) {
                throw new UnexpectedArgumentError(UnexpectedArgumentError.buildMessage(arg, actual.type), null);
            }
        }
    }
}