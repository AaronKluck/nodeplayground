import { injectable, inject } from "inversify"
import { IResponse } from "../response/interfaces"
import { IJsonStorageReader } from "../storage/interfaces"
import { TYPES } from "../types"

@injectable()
export class RootHandler {
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
