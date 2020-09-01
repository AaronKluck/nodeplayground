export interface IFileIo {
    Read() : Promise<Buffer>
    Write(data: string | NodeJS.ArrayBufferView) : Promise<void>
}

export interface IJsonStorageReader {
    Read(key : string) : Promise<string>
    ReadAll() : Promise<{[key : string]: string}>
}

export interface IJsonStorageWriter {
    Write(key : string, value : string) : Promise<void>
}