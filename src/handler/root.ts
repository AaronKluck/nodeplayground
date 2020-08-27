import { injectable, inject } from "inversify";
import { IStorageReader, IRootHandler, ISender } from "../interfaces";
import { TYPES } from "../types"

@injectable()
export class RootHandler implements IRootHandler {
    storageReader : IStorageReader

    constructor(
        @inject(TYPES.IStorageReader) storageReader : IStorageReader
    ) {
        this.storageReader = storageReader
    }

    async Execute(params : { [key: string]: string }, output : ISender) {
        output.Send(JSON.stringify(await this.storageReader.ReadAll()))
    }
}
