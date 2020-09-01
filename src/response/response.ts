import express from "express"
import { injectable } from "inversify"
import { IResponse } from "../response/interfaces"

export class Response {
    res : express.Response

    constructor(res : express.Response) {
        this.res = res
    }

    Send(output: string) : void {
        this.res.send(output)
    }
}

export function ResponseFactory(res : express.Response) : IResponse {
    return new Response(res)
}