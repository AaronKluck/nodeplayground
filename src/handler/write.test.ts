import "reflect-metadata"
import * as TypeMoq from "typemoq"
import { WriteHandler } from './write'
import { IResponse } from "../response/interfaces"
import { IJsonStorageWriter } from "../storage/interfaces"

test('Execute no inputs', async () => {
    const mockStorage : TypeMoq.IMock<IJsonStorageWriter> = TypeMoq.Mock.ofType<IJsonStorageWriter>(undefined, TypeMoq.MockBehavior.Strict)
    const mockResponse : TypeMoq.IMock<IResponse> = TypeMoq.Mock.ofType<IResponse>(undefined, TypeMoq.MockBehavior.Strict)
    mockResponse.setup(
        m => m.Send(TypeMoq.It.is(x => x.search("GET param") >= 0))
    ).returns(() => Promise.resolve()).verifiable(TypeMoq.Times.once())

    let handler = new WriteHandler(mockStorage.object)
    let params : {[key: string]: string} = {}
    await handler.Execute(params, mockResponse.object)

    mockResponse.verifyAll()
    mockStorage.verifyAll()
})

test('Execute has inputs', async () => {
    const mockStorage : TypeMoq.IMock<IJsonStorageWriter> = TypeMoq.Mock.ofType<IJsonStorageWriter>(undefined, TypeMoq.MockBehavior.Strict)
    const mockResponse : TypeMoq.IMock<IResponse> = TypeMoq.Mock.ofType<IResponse>(undefined, TypeMoq.MockBehavior.Strict)
    mockStorage.setup(
        m => m.Write("foo", "bar")
    ).returns(() => Promise.resolve()).verifiable(TypeMoq.Times.once())
    mockStorage.setup(
        m => m.Write("cat", "dog")
    ).returns(() => Promise.resolve()).verifiable(TypeMoq.Times.once())
    mockResponse.setup(
        m => m.Send(TypeMoq.It.is(x => x.search("foo => bar") == 0 && x.search("cat => dog") > 0))
    ).returns(() => Promise.resolve()).verifiable(TypeMoq.Times.once())

    let handler = new WriteHandler(mockStorage.object)
    let params : {[key: string]: string} = {
        "foo": "bar",
        "cat": "dog"
    }
    await handler.Execute(params, mockResponse.object)

    mockResponse.verifyAll()
    mockStorage.verifyAll()
})