import { ISender } from "../sender";
import { IStorageReader } from "../storage";

export class RootHandler {
    storageReader : IStorageReader

    constructor(storageReader : IStorageReader) {
        this.storageReader = storageReader
    }

    async Execute(params : { [key: string]: string }, output : ISender) {
        output.send(JSON.stringify(await this.storageReader.ReadAll()))
    }
}
