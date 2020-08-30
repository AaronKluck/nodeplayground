import express from "express"
import { injectable, } from "inversify"
import { IResponse, IResponseFactory } from "../interfaces"

export class Response implements IResponse {
    res : express.Response

    constructor(res : express.Response) {
        this.res = res
    }

    Send(output: string) : void {
        this.res.send(output)
    }
}

@injectable()
export class ResponseFactory implements IResponseFactory {
    Create(res : express.Response) : IResponse {
        return new Response(res)
    }
}