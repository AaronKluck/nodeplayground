import "reflect-metadata";
import { Container, interfaces } from "inversify";
import { IStorageReader, IStorageWriter, ISenderFactory, IRootHandler, IReadHandler, IWriteHandler } from "./interfaces";
import { TYPES } from "./types";
import { Storage } from "./storage";
import { SenderFactory } from "./sender"
import { RootHandler } from "./handler/root"
import { ReadHandler } from "./handler/read"
import { WriteHandler } from "./handler/write"
import { Controller } from "./controller"
import { PathLike } from "fs";

const myContainer = new Container();

myContainer.bind<ISenderFactory>(TYPES.ISenderFactory).to(SenderFactory).inSingletonScope();
myContainer.bind<IRootHandler>(TYPES.IRootHandler).to(RootHandler).inSingletonScope();
myContainer.bind<IReadHandler>(TYPES.IReadHandler).to(ReadHandler).inSingletonScope();
myContainer.bind<IWriteHandler>(TYPES.IWriteHandler).to(WriteHandler).inSingletonScope();
myContainer.bind<Controller>(TYPES.Controller).to(Controller).inSingletonScope();

// The single Storage instance fulfills both IStorageReader and IStorageWriter interfaces
myContainer.bind<Storage>(TYPES.Storage).to(Storage).inSingletonScope()
myContainer.bind<IStorageReader>(TYPES.IStorageReader).toDynamicValue((context : interfaces.Context) => { return context.container.get<Storage>(TYPES.Storage) }).inSingletonScope()
myContainer.bind<IStorageWriter>(TYPES.IStorageWriter).toDynamicValue((context : interfaces.Context) => { return context.container.get<Storage>(TYPES.Storage) }).inSingletonScope()

myContainer.bind<PathLike>(TYPES.storagePath).toConstantValue("./data/storage.json")

export { myContainer };