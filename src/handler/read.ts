import { injectable, inject } from "inversify";
import { IResponse, IJsonStorageReader, IRootHandler } from "../interfaces";
import { TYPES } from "../types"

@injectable()
export class ReadHandler implements IRootHandler {
    storageReader : IJsonStorageReader

    constructor(
        @inject(TYPES.IJsonStorageReader) storageReader : IJsonStorageReader
    ) {
        this.storageReader = storageReader
    }

    async Execute(params : { [key: string]: string }, output : IResponse) {
        if (params.q === undefined) {
            output.Send(
                "usage: GET param 'q' w/ comma-separated keys to query<br/>"
                + "example: read?q=foo,bar"
            )
            return
        }

        let html = ""
        const keys = params.q.split(",")
        for(const idx in keys) {
            const value = await this.storageReader.Read(keys[idx])
            html += keys[idx] + " : " + value + "<br/>"
        }
        output.Send(html)
    }
}