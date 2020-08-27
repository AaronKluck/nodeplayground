import express from "express";
import { injectable, } from "inversify";
import { ISender, ISenderFactory } from "./interfaces"

export class Sender implements ISender {
    res : express.Response;

    constructor(res : express.Response) {
        this.res = res;
    }

    Send(output: string) : void {
        this.res.send(output)
    }
}

@injectable()
export class SenderFactory implements ISenderFactory {
    Create(res : express.Response) : ISender {
        return new Sender(res)
    }
}