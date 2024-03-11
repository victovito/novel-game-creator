import Header from "../expressions/Header";
import Block from "../scopes/Block";
import getHeaderFunction from "../actuators/Headers";
import Value from "../values/Value";
import InvalidHeaderError from "../errors/InvalidHeaderError";
import UnexpectedArgumentCountError from "../errors/UnexpectedArgumentCountError";
import UnexpectedArgumentError from "../errors/UnexpectedArgumentError";
import NovelParsingError from "../errors/NovelParsingError";
import NovelEvents from "../events/NovelEvents";

export default class NovelObject {
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
                if (!fn) {
                    throw new InvalidHeaderError(InvalidHeaderError.buildMessage(h), header.line);
                } else {
                    fn(this, ...header.args);
                }
            } catch (error) {
                if (error instanceof UnexpectedArgumentCountError) {
                    error.line = header.line;
                    throw error;
                } else
                if (error instanceof UnexpectedArgumentError) {
                    error.line = header.line;
                    throw error;
                } else
                if (error instanceof InvalidHeaderError) {
                    throw error;
                } else {
                    throw new NovelParsingError(error.message, header.line);
                }
            }
        });
    }

    getVariable(reference: string) {
        return this.variables.get(reference);
    }

    getBlock(reference: string) {
        return this.blocks.get(reference);
    }
}
