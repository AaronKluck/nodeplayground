import express from "express"

export interface IResponse{
    Send(output: string) : void
 }

export interface IResponseFactory {
    Create(res : express.Response) : IResponse
}