import Header from "../expressions/Header";
import Block from "../scopes/Block";
import getHeaderFunction from "../actuators/Headers";
import Value from "../values/Value";
import NovelParsingError from "../errors/parsing/NovelParsingError";
import NovelEvents from "../events/NovelEvents";
import Command from "../expressions/Command";
import getCommandFunction from "../actuators/Commands";
import NovelRuntimeError from "../errors/runtime/NovelRuntimeError";

export default class Novel {
    title: string;
    author: string;
    entry: Block;
    locked: boolean = false;
    headers: Header[] = [];
    blocks: Map<string, Block> = new Map<string, Block>();
    variables: Map<string, Value> = new Map<string, Value>();
    rawContent: string = "";
    events: NovelEvents = new NovelEvents();
    
    constructor() {}

    processHeaders(): void {
        this.headers.forEach(header => {
            try {
                const h = header.identifier.toUpperCase();
                const fn = getHeaderFunction(h);
                fn(this, ...header.args);
            } catch (error) {
                if (error instanceof NovelParsingError) {
                    error.line = header.line;
                    throw error;
                } else {
                    throw new NovelParsingError(error.message, header.line);
                }
            }
        });
    }

    run(command: Command) {
        try {
            const c = command.identifier.toLowerCase();
            const fn = getCommandFunction(c);
            fn(this, ...command.args);
        } catch (error) {
            if (error instanceof NovelRuntimeError) {
                error.line = command.line;
                this.events.onRuntimeError.emit(error);
            } else {
                this.events.onRuntimeError.emit(new NovelRuntimeError(error.message, command.line));
            }
        }
    }

    setVariables(reference: string, value: Value) {
        this.variables.set(reference, value);
        this.events.variableUpdated.emit({ reference, value });
    }

    getVariable(reference: string) {
        return this.variables.get(reference);
    }

    getBlock(reference: string) {
        return this.blocks.get(reference);
    }
}
