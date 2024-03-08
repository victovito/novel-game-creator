import { IpcMain } from "electron";
import fileManager from "./fileManager";

function setUpListeners(ipcMain: IpcMain) {
    ipcMain.on("request-novel", (event) => fileManager.requestNovel(event));
    ipcMain.on("check-for-novel-update", (event, path, content) => fileManager.checkForNovelUpdate(event, path, content));
}

export default setUpListeners;
