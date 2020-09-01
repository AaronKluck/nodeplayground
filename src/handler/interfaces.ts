import { IResponse } from "../response/interfaces";

export interface IHandler {
    Execute(params : { [key: string]: string }, output : IResponse) : Promise<void>
}

// Empty extensions for DI purposes
export interface IRootHandler extends IHandler { }
export interface IReadHandler extends IHandler { }
export interface IWriteHandler extends IHandler { }