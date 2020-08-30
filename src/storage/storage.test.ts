import "reflect-metadata";
import * as TypeMoq from "typemoq";
import { Storage } from './storage'
import { IFileIo } from "../interfaces";

const testFile = "./data/storage.test.json"

test('Read exists', async () => {
    const mockFileIo : TypeMoq.IMock<IFileIo> = TypeMoq.Mock.ofType<IFileIo>();
    mockFileIo.setup(m => m.Read()).returns(() => Promise.resolve(Buffer.from("{\"key\":\"value\"}")))

    let storage = new Storage(mockFileIo.object)
    let value = await storage.Read("key")

    expect(value).toBe("value")
    mockFileIo.verifyAll()
})

test('Read not exists', async () => {
    const readBuffer = Buffer.from("{\"key\":\"value\"}")

    const mockFileIo : TypeMoq.IMock<IFileIo> = TypeMoq.Mock.ofType<IFileIo>();
    mockFileIo.setup(m => m.Read()
    ).returns(() => Promise.resolve(readBuffer)).verifiable(TypeMoq.Times.once())

    let storage = new Storage(mockFileIo.object)
    let value = await storage.Read("missing")

    expect(value).toBe("")
    mockFileIo.verifyAll()
})

test('Read bad json', async () => {
    const readBuffer = Buffer.from("im not json")

    const mockFileIo : TypeMoq.IMock<IFileIo> = TypeMoq.Mock.ofType<IFileIo>();
    mockFileIo.setup(m => m.Read()
    ).returns(() => Promise.resolve(readBuffer)).verifiable(TypeMoq.Times.once())

    let storage = new Storage(mockFileIo.object)
    try {
        await storage.Read("missing")
        expect(true).toBeFalsy()
    } catch (e) {
        expect(e instanceof SyntaxError).toBeTruthy()
    }

    mockFileIo.verifyAll()
})

test('ReadAll', async () => {
    const readBuffer = Buffer.from("{\"key\":\"value\",\"foo\":\"bar\",\"obj\":{}}")

    const mockFileIo : TypeMoq.IMock<IFileIo> = TypeMoq.Mock.ofType<IFileIo>();
    mockFileIo.setup(m => m.Read()
    ).returns(() => Promise.resolve(readBuffer)).verifiable(TypeMoq.Times.once())

    let storage = new Storage(mockFileIo.object)
    let all = await storage.ReadAll()

    expect(Object.keys(all).length).toBe(2)
    expect(all["key"]).toBe("value")
    expect(all["foo"]).toBe("bar")
    mockFileIo.verifyAll()
})

test('Write ', async () => {
    const readBuffer = Buffer.from("{\"key\":\"value\"}")
    const writeStr = "{\"key\":\"value\",\"foo\":\"bar\"}"

    const mockFileIo : TypeMoq.IMock<IFileIo> = TypeMoq.Mock.ofType<IFileIo>();
    mockFileIo.setup(m => m.Read()
    ).returns(() => Promise.resolve(readBuffer)).verifiable(TypeMoq.Times.once())
    mockFileIo.setup(m => m.Write(TypeMoq.It.isValue<string>(writeStr))
    ).returns(() => Promise.resolve()).verifiable(TypeMoq.Times.once())


    let storage = new Storage(mockFileIo.object)

    await storage.Write("foo", "bar")

    mockFileIo.verifyAll()
})