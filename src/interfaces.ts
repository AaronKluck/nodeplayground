import express from "express";

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

export interface IResponse{
    Send(output: string) : void;
 }

export interface IResponseFactory {
    Create(res : express.Response) : IResponse
}

export interface IHandler {
    Execute(params : { [key: string]: string }, output : IResponse) : Promise<void>
}

// Empty extensions for DI purposes
export interface IRootHandler extends IHandler { }
export interface IReadHandler extends IHandler { }
export interface IWriteHandler extends IHandler { }