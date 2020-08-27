import { injectable, inject } from "inversify";
import { ISender, IStorageReader, IRootHandler } from "../interfaces";
import { TYPES } from "../types"

@injectable()
export class ReadHandler implements IRootHandler {
    storageReader : IStorageReader

    constructor(
        @inject(TYPES.IStorageReader) storageReader : IStorageReader
    ) {
        this.storageReader = storageReader
    }

    async Execute(params : { [key: string]: string }, output : ISender) {
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