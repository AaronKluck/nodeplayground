import "reflect-metadata";
import { Container, interfaces } from "inversify";
import { IFileIo, IJsonStorageReader, IJsonStorageWriter, IResponseFactory, IRootHandler, IReadHandler, IWriteHandler } from "./interfaces";
import { TYPES } from "./types";
import { FileIo } from "./storage/file_io";
import { Storage } from "./storage/storage";
import { ResponseFactory } from "./response"
import { RootHandler } from "./handler/root"
import { ReadHandler } from "./handler/read"
import { WriteHandler } from "./handler/write"
import { Controller } from "./controller"
import { PathLike } from "fs";

const myContainer = new Container();

myContainer.bind<IFileIo>(TYPES.IFileIo).to(FileIo).inSingletonScope();
myContainer.bind<IResponseFactory>(TYPES.IResponseFactory).to(ResponseFactory).inSingletonScope();
myContainer.bind<IRootHandler>(TYPES.IRootHandler).to(RootHandler).inSingletonScope();
myContainer.bind<IReadHandler>(TYPES.IReadHandler).to(ReadHandler).inSingletonScope();
myContainer.bind<IWriteHandler>(TYPES.IWriteHandler).to(WriteHandler).inSingletonScope();
myContainer.bind<Controller>(TYPES.Controller).to(Controller).inSingletonScope();

// The single Storage instance fulfills both IStorageReader and IStorageWriter interfaces
myContainer.bind<Storage>(TYPES.Storage).to(Storage).inSingletonScope()
myContainer.bind<IJsonStorageReader>(TYPES.IJsonStorageReader).toDynamicValue((context : interfaces.Context) => { return context.container.get<Storage>(TYPES.Storage) }).inSingletonScope()
myContainer.bind<IJsonStorageWriter>(TYPES.IJsonStorageWriter).toDynamicValue((context : interfaces.Context) => { return context.container.get<Storage>(TYPES.Storage) }).inSingletonScope()

myContainer.bind<PathLike>(TYPES.storagePath).toConstantValue("./data/storage.json")

export { myContainer };