import Resource, { ResourceType } from "./Resource";

export default class AudioResource extends Resource {
    name: string;
    path: string;
    level: number = 1;
    progress: number = 0;
    playing: boolean = false;
    loop: boolean;

    override readonly type: ResourceType = ResourceType.Audio;

    constructor(name: string, path: string) {
        super(name, path);
    }
}
