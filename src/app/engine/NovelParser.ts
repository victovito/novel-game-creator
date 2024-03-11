import Header from "./expressions/Header";
import Line from "./structural/Line";
import Block from "./scopes/Block";
import NovelObject from "./structural/NovelObject";
import NovelParsingError from "./errors/NovelParsingError";
import UnexpectedSymbolError from "./errors/UnexpectedSymbolError";
import getCommandFunction from "./actuators/Commands";

export function parseNovel(file: string, callback: (novel: NovelObject, error: NovelParsingError) => void) {
    const novel = new NovelObject();
    novel.rawContent = file;

    const lines = file.split("\r\n").map((line, i) => {
        return { content: line.trim(), number: i + 1 } as Line;
    });

    try {
        const rootLines = lines.map(x => x);

        const blocks = Block.generateScopes(lines);
        blocks.forEach(block => {
            novel.blocks.set(block.reference, block);
            rootLines.splice(rootLines.indexOf(block.starting), block.innerText.length + 2);
        });
        const headers = rootLines.map(line => Header.tryParse(line)).filter(header => header != null);
        headers.forEach(header => {
            rootLines.splice(rootLines.indexOf(header.line), 1);
        });
        rootLines.forEach(line => {
            if (line.content != "") {
                throw new UnexpectedSymbolError(line.content[0], line);
            }
        });

        novel.headers = headers;
        novel.processHeaders();

        callback(novel, null);
    } catch (error) {
        callback(null, error);
    }
}
