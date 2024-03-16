import { ipcRenderer } from "electron";
import { IAudioFIleRequest, IAudioFIleResponse } from "./interfaces/IAudioFile";

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

function requestAudioFiles(requests: IAudioFIleRequest[]) {
    ipcRenderer.send("request-audio-files", requests);
}

function onAudioFilesRetrieved(callback: (audioFiles: IAudioFIleResponse[]) => void) {
    ipcRenderer.once("audio-files-retrieved", (event, audioFiles: IAudioFIleResponse[]) => callback(audioFiles));
}

export default {
    requestNovel,
    onNovelRetrieved,
    checkForNovelUpdate,
    onNovelUpdated,
    requestAudioFiles,
    onAudioFilesRetrieved
};
