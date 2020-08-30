// This needs to be imported only once
import "reflect-metadata"

import { Container, interfaces } from "inversify"
import { IFileIo, IJsonStorageReader, IJsonStorageWriter, IResponseFactory, IRootHandler, IReadHandler, IWriteHandler } from "./interfaces"
import { TYPES } from "./types"
import { FileIo } from "./storage/file_io"
import { JsonStorage } from "./storage/json_storage"
import { ResponseFactory } from "./response/response"
import { RootHandler } from "./handler/root"
import { ReadHandler } from "./handler/read"
import { WriteHandler } from "./handler/write"
import { KeyValueController } from "./controller/keyvalue_controller"
import { PathLike } from "fs"

const myContainer = new Container()

// This injectable interfaces all exist as singletons
myContainer.bind<IFileIo>(TYPES.IFileIo).to(FileIo).inSingletonScope()
myContainer.bind<IResponseFactory>(TYPES.IResponseFactory).to(ResponseFactory).inSingletonScope()
myContainer.bind<IRootHandler>(TYPES.IRootHandler).to(RootHandler).inSingletonScope()
myContainer.bind<IReadHandler>(TYPES.IReadHandler).to(ReadHandler).inSingletonScope()
myContainer.bind<IWriteHandler>(TYPES.IWriteHandler).to(WriteHandler).inSingletonScope()

// This isn't an interface, but it can be resolved using DI
myContainer.bind<KeyValueController>(TYPES.Controller).to(KeyValueController).inSingletonScope()

// The single JsonStorage instance fulfills both IJsonStorageReader and
// IJsonStorageWriter interfaces, but we can still make sure it's instantiated
// only once.
myContainer.bind<JsonStorage>(TYPES.Storage).to(JsonStorage).inSingletonScope()
myContainer.bind<IJsonStorageReader>(TYPES.IJsonStorageReader).toDynamicValue((context : interfaces.Context) => { return context.container.get<JsonStorage>(TYPES.Storage) }).inSingletonScope()
myContainer.bind<IJsonStorageWriter>(TYPES.IJsonStorageWriter).toDynamicValue((context : interfaces.Context) => { return context.container.get<JsonStorage>(TYPES.Storage) }).inSingletonScope()

myContainer.bind<PathLike>(TYPES.storagePath).toConstantValue("./data/storage.json")

export { myContainer }