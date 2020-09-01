import "reflect-metadata"
import express from "express"
import * as TypeMoq from "typemoq"
import { ResponseFactory} from './response'

test('Create and Send', async () => {
    const mockExpressResponse : TypeMoq.IMock<express.Response> = TypeMoq.Mock.ofType<express.Response>(undefined, TypeMoq.MockBehavior.Strict)
    mockExpressResponse.setup(
        m => m.send(TypeMoq.It.isValue<string>("expect this"))
    ).verifiable(TypeMoq.Times.once())

    let expressResponse : express.Response = mockExpressResponse.object

    let resp = ResponseFactory(expressResponse)
    resp.Send("expect this")

    mockExpressResponse.verifyAll()
})