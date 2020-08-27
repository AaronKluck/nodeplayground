import express from "express";

export interface IStorageReader {
    Read(key : string) : Promise<string>
    ReadAll() : Promise<{[key : string]: string}>
}

export interface IStorageWriter {
    Write(key : string, value : string) : Promise<void>
}

export interface ISender{
    Send(output: string) : void;
 }

export interface ISenderFactory {
    Create(res : express.Response) : ISender
}

export interface IHandler {
    Execute(params : { [key: string]: string }, output : ISender) : Promise<void>
}

// Empty extensions for DI purposes
export interface IRootHandler extends IHandler { }
export interface IReadHandler extends IHandler { }
export interface IWriteHandler extends IHandler { }