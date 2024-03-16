import { IAudioFIleRequest, IAudioFIleResponse } from "../../interfaces/IAudioFile";
import FileNotFoundError from "../errors/parsing/FileNotFoundError";
import AudioResource from "../resources/AudioResource";
import Novel from "./Novel";

export default class AudioManager {
    private audios: Map<string, IAudioResource> = new Map<string, IAudioResource>();
    private _globalLevel: number = 1;

    constructor(private novel: Novel) {}

    get globalLevel() { return this._globalLevel; }
    set globalLevel(value: number) {
        this.all.forEach(audio => audio.element.volume = value);
    }

    play(audio: AudioResource) {
        const audioElement = this.audios.get(audio.name).element;
        audio.playing = true;
        audioElement.play();
    }
    
    stop(audio: AudioResource) {
        const audioElement = this.audios.get(audio.name).element;
        audio.playing = false;
        audio.progress = 0;
        audioElement.pause();
        audioElement.currentTime = 0;
    }

    resumeAll() {
        this.all.forEach(audio => {
            if (audio.resource.playing) audio.element.play();
        });
    }

    pauseAll() {
        this.all.forEach(audio => audio.element.pause());
    }

    stopAll() {
        this.all.forEach(audio => this.stop(audio.resource));
    }
    
    loadResources() {
        return new Promise<void>((resolve, reject) => {
            this.audioResources.forEach(audio => {
                this.audios.set(audio.name, { resource: audio, element: null, loaded: false });
            });
            this.getAudioBuffers().then(buffers => {
                buffers.forEach(file => {
                    const resource = this.audios.get(file.name);
                    resource.loaded = true;
                    const blob = new Blob([file.buffer], { type: "audio" });
                    const audio = new Audio(URL.createObjectURL(blob));
                    audio.volume = resource.resource.level;
                    audio.currentTime = resource.resource.progress / 100;
                    audio.loop = resource.resource.loop;
                    resource.element = audio;
                });
                resolve();
            }).catch((error: IAudioFIleResponse) => {
                const audio = this.audios.get(error.name);
                reject(new FileNotFoundError(audio.resource.path));
            });
        });
    }

    private getAudioBuffers() {
        return new Promise<IAudioFIleResponse[]>((resolve, reject) => {
            const requests: IAudioFIleRequest[] = [];
            this.audioResources.forEach(audio => {
                requests.push({name: audio.name, novelPath: this.novel.path, filePath: audio.path});
            });
            api.onAudioFilesRetrieved(audioFiles => {
                const errors = audioFiles.filter(file => !file.buffer);
                if (errors.length == 0) {
                    resolve(audioFiles);
                } else {
                    reject(errors[0]);
                }
            });
            api.requestAudioFiles(requests);
        });
    }

    private get audioResources() {
        const resources: AudioResource[] = [];
        Array.from(this.novel.variables.values()).forEach(value => {
            if (value instanceof AudioResource) {
                resources.push(value);
            }
        })
        return resources;
    }

    private get all() {
        return Array.from(this.audios.values());
    }
}

interface IAudioResource {
    resource: AudioResource;
    element: HTMLAudioElement;
    loaded: boolean;
}
