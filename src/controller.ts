import express from "express";
import { ISender, ISenderFactory } from "./sender";

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

export interface IHandler {
    Execute(params : { [key: string]: string }, output : ISender) : Promise<void>
}

export class Controller {
    senderFactory : ISenderFactory
    rootHandler : IHandler
    fooHandler : IHandler
    barHandler : IHandler

    constructor(
        senderFactory : ISenderFactory,
        rootHandler : IHandler,
        fooHandler : IHandler,
        barHandler : IHandler,
    ) {
        this.senderFactory = senderFactory
        this.rootHandler = rootHandler
        this.fooHandler = fooHandler
        this.barHandler = barHandler
    }

    async root(req : express.Request, res : express.Response) {
        await this.rootHandler.Execute(parseParams(req), this.senderFactory(res))
    }

    async foo(req : express.Request, res : express.Response) {
        await this.fooHandler.Execute(parseParams(req), this.senderFactory(res))
    }

    async bar(req : express.Request, res : express.Response) {
        await this.barHandler.Execute(parseParams(req), this.senderFactory(res))
    }
}