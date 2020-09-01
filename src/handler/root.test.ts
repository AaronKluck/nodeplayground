import "reflect-metadata"
import * as TypeMoq from "typemoq"
import { RootHandler } from './root'
import { IResponse } from "../response/interfaces"
import { IJsonStorageReader } from "../storage/interfaces"

test('Execute no query', async () => {
    const mockStorage : TypeMoq.IMock<IJsonStorageReader> = TypeMoq.Mock.ofType<IJsonStorageReader>(undefined, TypeMoq.MockBehavior.Strict)
    const mockResponse : TypeMoq.IMock<IResponse> = TypeMoq.Mock.ofType<IResponse>(undefined, TypeMoq.MockBehavior.Strict)
    mockStorage.setup(
        m => m.ReadAll()
    ).returns(() => Promise.resolve({ "foo": "bar", "cat": "dog" })
    ).verifiable(TypeMoq.Times.once())
    mockResponse.setup(
        m => m.Send(TypeMoq.It.isValue<string>("{\"foo\":\"bar\",\"cat\":\"dog\"}"))
    ).returns(() => Promise.resolve()).verifiable(TypeMoq.Times.once())

    let handler = new RootHandler(mockStorage.object)
    let params : {[key: string]: string} = {}
    await handler.Execute(params, mockResponse.object)

    mockResponse.verifyAll()
    mockStorage.verifyAll()
})