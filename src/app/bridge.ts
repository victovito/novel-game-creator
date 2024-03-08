import { ipcRenderer } from "electron";

function requestNovel() {
    ipcRenderer.send("request-novel");
}

function onNovelRetrieved(callback: (path: string, content: string) => void) {
    ipcRenderer.on("novel-retrieved", (event, path: string, content: string) => callback(path, content))
}

function checkForNovelUpdate(path: string, content: string) {
    ipcRenderer.send("check-for-novel-update", path, content);
}

function onNovelUpdated(callback: (content: string) => void) {
    ipcRenderer.on("novel-updated", (event, content: string) => callback(content))
}

export default {
    requestNovel,
    onNovelRetrieved,
    checkForNovelUpdate,
    onNovelUpdated
};
