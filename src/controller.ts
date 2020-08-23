import express from "express";
import { ISenderFactory } from "./sender";
import { IHandler } from "./handler";

// We want to break dependency on Express and deal with simple string:string
// dictionaries as inputs.
function parseParams(req : express.Request): { [key: string]: string } {
    let params: { [key: string]: string } = {}
    for (let key in req.query) {
        let value = req.query[key];

        if (typeof value === "string") {
            params[key] = value
        }
    }
    return params
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

    root(req : express.Request, res : express.Response) {
        this.rootHandler.Execute(parseParams(req), this.senderFactory(res))
    }

    foo(req : express.Request, res : express.Response) {
        this.fooHandler.Execute(parseParams(req), this.senderFactory(res))
    }

    bar(req : express.Request, res : express.Response) {
        this.barHandler.Execute(parseParams(req), this.senderFactory(res))
    }
}