import Header from "./expressions/Header";
import Line from "./structural/Line";
import Block from "./scopes/Block";
import Novel from "./objects/Novel";
import UnexpectedSymbolError from "./errors/parsing/UnexpectedSymbolError";
import NovelError from "./errors/NovelError";

export function parseNovel(file: string, path: string) {
    return new Promise<Novel>(async (resolve, reject: (error: NovelError) => void) => {
        console.log("Parsing...");
        const novel = new Novel();
        novel.rawContent = file;
        novel.path = path;
    
        const lines = file.split("\r\n").map((line, i) => {
            const comment = line.match(/\/\/.*/);
            return {
                raw: line,
                content: line.trim().replace(comment ? comment[0] : "", ""),
                number: i + 1
            } as Line;
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
            await novel.loadResources();

            resolve(novel);
        } catch (error) {
            reject(error);
        }
    });
}
