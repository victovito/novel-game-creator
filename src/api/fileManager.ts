import { dialog, IpcMainEvent } from "electron";
import fs from "fs";

async function requestNovel(event: IpcMainEvent) {
    const dialogRes = await dialog.showOpenDialog({
        properties: ["openFile"]
    });
    if (!dialogRes.canceled) {
        const file = fs.readFileSync(dialogRes.filePaths[0]).toString();
        event.sender.send("novel-retrieved", dialogRes.filePaths[0], file);
    }
}

async function checkForNovelUpdate(event: IpcMainEvent, path: string, content: string) {
    const file = fs.readFileSync(path).toString();
    if (file !== content) {
        event.sender.send("novel-updated", file);
    }
}

export default {
    requestNovel,
    checkForNovelUpdate
};