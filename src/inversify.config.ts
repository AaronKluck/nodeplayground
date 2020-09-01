// This needs to be imported only once
import "reflect-metadata"

import { Container, interfaces } from "inversify"
import { IRootHandler, IReadHandler, IWriteHandler } from "./handler/interfaces"
import { IResponse } from "./response/interfaces"
import { IFileIo, IJsonStorageReader, IJsonStorageWriter } from "./storage/interfaces"
import { TYPES } from "./types"
import { FileIo } from "./storage/file_io"
import { JsonStorage } from "./storage/json_storage"
import { ResponseFactory } from "./response/response"
import { RootHandler } from "./handler/root"
import { ReadHandler } from "./handler/read"
import { WriteHandler } from "./handler/write"
import { KeyValueController } from "./controller/keyvalue_controller"
import { PathLike } from "fs"

const container = new Container()

// This injectable interfaces all exist as singletons
container.bind<IFileIo>(TYPES.IFileIo).to(FileIo).inSingletonScope()
container.bind<IRootHandler>(TYPES.IRootHandler).to(RootHandler).inSingletonScope()
container.bind<IReadHandler>(TYPES.IReadHandler).to(ReadHandler).inSingletonScope()
container.bind<IWriteHandler>(TYPES.IWriteHandler).to(WriteHandler).inSingletonScope()

// This isn't an interface, but it can be resolved using DI
container.bind<KeyValueController>(TYPES.Controller).to(KeyValueController).inSingletonScope()

// The single JsonStorage instance fulfills both IJsonStorageReader and
// IJsonStorageWriter interfaces, but we can still make sure it's instantiated
// only once.
container.bind<JsonStorage>(TYPES.Storage).to(JsonStorage).inSingletonScope()
container.bind<IJsonStorageReader>(TYPES.IJsonStorageReader).toDynamicValue((context : interfaces.Context) => { return context.container.get<JsonStorage>(TYPES.Storage) }).inSingletonScope()
container.bind<IJsonStorageWriter>(TYPES.IJsonStorageWriter).toDynamicValue((context : interfaces.Context) => { return context.container.get<JsonStorage>(TYPES.Storage) }).inSingletonScope()

// This interface needs an injectable factory method
container.bind<interfaces.Factory<IResponse>>(TYPES.IResponseFactory).toFactory<IResponse>((context: interfaces.Context) => { return ResponseFactory });

// This is a value and not an interface or class, but we can still inject it
container.bind<PathLike>(TYPES.storagePath).toConstantValue("./data/storage.json")

export { container }