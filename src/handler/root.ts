import { injectable, inject } from "inversify"
import { IJsonStorageReader, IRootHandler, IResponse } from "../interfaces"
import { TYPES } from "../types"

@injectable()
export class RootHandler implements IRootHandler {
    storageReader : IJsonStorageReader

    constructor(
        @inject(TYPES.IJsonStorageReader) storageReader : IJsonStorageReader
    ) {
        this.storageReader = storageReader
    }

    async Execute(params : { [key: string]: string }, output : IResponse) {
        output.Send(JSON.stringify(await this.storageReader.ReadAll()))
    }
}
