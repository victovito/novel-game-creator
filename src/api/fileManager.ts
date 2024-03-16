import { dialog, IpcMainEvent } from "electron";
import fs from "fs";
import path from "path";
import { IAudioFIleRequest, IAudioFIleResponse } from "../app/interfaces/IAudioFile";

async function requestNovel(event: IpcMainEvent) {
    const dialogRes = await dialog.showOpenDialog({
        properties: ["openFile"],
        filters: [
            { name: "Novel file", extensions: ["novel"] }
        ]
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

async function getAudioFiles(event: IpcMainEvent, requests: IAudioFIleRequest[]) {
    const responses: IAudioFIleResponse[] = [];
    requests.forEach(req => {
        const finalPath = path.join(path.dirname(req.novelPath), req.filePath);
        const name = path.basename(finalPath).replace(path.extname(finalPath), "");
        try {
            const buffer = fs.readFileSync(finalPath);
            responses.push({name, buffer});
        } catch (error) {
            responses.push({name, buffer: null});
        }
    });
    event.sender.send("audio-files-retrieved", responses);
}

export default {
    requestNovel,
    checkForNovelUpdate,
    getAudioFiles
};

