import "reflect-metadata"
import express from "express"
import * as TypeMoq from "typemoq"
import { KeyValueController } from './keyvalue_controller'
import { IResponseFactory, IResponse } from '../response/interfaces'
import { IRootHandler, IReadHandler, IWriteHandler } from '../handler/interfaces'

// Steal this interface definition from express so we can mock it
interface ParsedQs { [key: string]: undefined | string | string[] | ParsedQs | ParsedQs[] }

test('Execute no query', async () => {
    // This one has a lot of setup because there are so many interfaces
    // injected here. If there were more than one test function, it'd be useful
    // to put all the common boilerplate in a helper function.
    const mockExpressRequest: TypeMoq.IMock<express.Request> = TypeMoq.Mock.ofType<express.Request>(undefined, TypeMoq.MockBehavior.Strict)
    const mockExpressResponse : TypeMoq.IMock<express.Response> = TypeMoq.Mock.ofType<express.Response>(undefined, TypeMoq.MockBehavior.Strict)
    const mockResponse : TypeMoq.IMock<IResponse> = TypeMoq.Mock.ofType<IResponse>(undefined, TypeMoq.MockBehavior.Strict)
    const mockResponseFactory : TypeMoq.IMock<IResponseFactory> = TypeMoq.Mock.ofType<IResponseFactory>(undefined, TypeMoq.MockBehavior.Strict)
    const mockRootHandler : TypeMoq.IMock<IRootHandler> = TypeMoq.Mock.ofType<IRootHandler>(undefined, TypeMoq.MockBehavior.Strict)
    const mockReadHandler : TypeMoq.IMock<IReadHandler> = TypeMoq.Mock.ofType<IReadHandler>(undefined, TypeMoq.MockBehavior.Strict)
    const mockWriteHandler : TypeMoq.IMock<IWriteHandler> = TypeMoq.Mock.ofType<IWriteHandler>(undefined, TypeMoq.MockBehavior.Strict)

    // The response is converted one per request
    mockResponseFactory.setup(
        m => m(TypeMoq.It.is<express.Response>(x => true))
    ).returns(() => mockResponse.object).verifiable(TypeMoq.Times.exactly(3))

    // The query property is access oned to iterate the keys, then another for
    // each key, per request.
    let query : ParsedQs = {
        "foo": "bar",
        "cat": undefined
    }
    mockExpressRequest.setup(
        m => m.query 
    ).returns(() => query).verifiable(TypeMoq.Times.exactly(9))

    // Each handler should be called exactly once
    mockRootHandler.setup(
        m => m.Execute(TypeMoq.It.isAny(), TypeMoq.It.isAny())
    ).returns(() => Promise.resolve()).verifiable(TypeMoq.Times.once())
    mockReadHandler.setup(
        m => m.Execute(TypeMoq.It.isAny(), TypeMoq.It.isAny())
    ).returns(() => Promise.resolve()).verifiable(TypeMoq.Times.once())
    mockWriteHandler.setup(
        m => m.Execute(TypeMoq.It.isAny(), TypeMoq.It.isAny())
    ).returns(() => Promise.resolve()).verifiable(TypeMoq.Times.once())

    let controller = new KeyValueController(
        mockResponseFactory.object,
        mockRootHandler.object,
        mockReadHandler.object,
        mockWriteHandler.object,
    )

    await controller.Root(mockExpressRequest.object, mockExpressResponse.object)
    await controller.Read(mockExpressRequest.object, mockExpressResponse.object)
    await controller.Write(mockExpressRequest.object, mockExpressResponse.object)

    mockExpressRequest.verifyAll()
    mockExpressResponse.verifyAll()
    mockResponse.verifyAll()
    mockResponseFactory.verifyAll()
    mockRootHandler.verifyAll()
    mockReadHandler.verifyAll()
    mockWriteHandler.verifyAll()
})