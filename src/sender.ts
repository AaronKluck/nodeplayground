import express from "express";

export interface ISender{
    send(output: string) : void;
 }

export class Sender implements ISender {
    res : express.Response;

    constructor(res : express.Response) {
        this.res = res;
    }

    send(output: string) : void {
        this.res.send(output)
    }
}

export type ISenderFactory = (res : express.Response)  => ISender;