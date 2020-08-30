import "reflect-metadata";
import * as TypeMoq from "typemoq";
import { ReadHandler } from './read';
import { IJsonStorageReader, IResponse } from '../interfaces'

test('Execute no query', async () => {
    const mockStorage : TypeMoq.IMock<IJsonStorageReader> = TypeMoq.Mock.ofType<IJsonStorageReader>();
    const mockResponse : TypeMoq.IMock<IResponse> = TypeMoq.Mock.ofType<IResponse>();
    mockResponse.setup(m => m.Send(TypeMoq.It.is(x => x.search("GET param") >= 0))).verifiable(TypeMoq.Times.once())

    let handler = new ReadHandler(mockStorage.object)

    let params : {[key: string]: string} = {
        "foo": "bar"
    }

    await handler.Execute(params, mockResponse.object)

    mockResponse.verifyAll()
    mockStorage.verifyAll()
})

test('Execute no query', async () => {
    const mockStorage : TypeMoq.IMock<IJsonStorageReader> = TypeMoq.Mock.ofType<IJsonStorageReader>();
    const mockResponse : TypeMoq.IMock<IResponse> = TypeMoq.Mock.ofType<IResponse>();
    mockStorage.setup(m => m.Read("foo")).returns(() => Promise.resolve("bar")).verifiable(TypeMoq.Times.once())
    mockStorage.setup(m => m.Read("cat")).returns(() => Promise.resolve("dog")).verifiable(TypeMoq.Times.once())
    mockResponse.setup(m => m.Send(TypeMoq.It.is(
        x => x.search("foo : bar") == 0 && x.search("cat : dog") > 0))
    ).verifiable(TypeMoq.Times.once());

    let handler = new ReadHandler(mockStorage.object)
    let params : {[key: string]: string} = {
        "q": "foo,cat"
    }

    await handler.Execute(params, mockResponse.object)

    mockResponse.verifyAll()
    mockStorage.verifyAll()
})