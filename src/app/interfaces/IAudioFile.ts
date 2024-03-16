export interface IAudioFIleResponse {
    name: string;
    buffer: Buffer;
}

export interface IAudioFIleRequest {
    name: string;
    novelPath: string;
    filePath: string;
}
