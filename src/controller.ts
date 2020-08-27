import express from "express";
import { injectable, inject } from "inversify";
import { IRootHandler, IReadHandler, IWriteHandler, ISenderFactory } from "./interfaces";
import { TYPES } from "./types"

// We want to break dependency on Express and deal with simple string:string
// dictionaries as inputs.
function parseParams(req : express.Request): { [key: string]: string } {
    const params: { [key: string]: string } = {}
    for (const key in req.query) {
        const value = req.query[key];

        if (typeof value === "string") {
            params[key] = value
        }
    }
    return params
}

@injectable()
export class Controller {
    senderFactory : ISenderFactory
    rootHandler : IRootHandler
    readHandler : IReadHandler
    writeHandler : IWriteHandler

    constructor(
        @inject(TYPES.ISenderFactory) senderFactory : ISenderFactory,
        @inject(TYPES.IRootHandler) rootHandler : IRootHandler,
        @inject(TYPES.IReadHandler) readHandler : IReadHandler,
        @inject(TYPES.IWriteHandler) writeHandler : IWriteHandler,
    ) {
        this.senderFactory = senderFactory
        this.rootHandler = rootHandler
        this.readHandler = readHandler
        this.writeHandler = writeHandler
    }

    async Root(req : express.Request, res : express.Response) {
        await this.rootHandler.Execute(parseParams(req), this.senderFactory.Create(res))
    }

    async Read(req : express.Request, res : express.Response) {
        await this.readHandler.Execute(parseParams(req), this.senderFactory.Create(res))
    }

    async Write(req : express.Request, res : express.Response) {
        await this.writeHandler.Execute(parseParams(req), this.senderFactory.Create(res))
    }
}