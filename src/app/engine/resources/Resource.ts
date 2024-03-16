export enum ResourceType {
    None = "None",
    Audio = "Audio",
    Image = "Image",
}

export default class Resource {
    name: string;
    path: string;

    readonly type: ResourceType = ResourceType.None;

    constructor(name: string, path: string) {
        this.name = name;
        this.path = path;
    }
}
