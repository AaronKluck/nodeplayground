import { ISender } from "../sender";
import { IStorageReader } from "../storage";

export class ReadHandler {
    storageReader : IStorageReader

    constructor(storageReader : IStorageReader) {
        this.storageReader = storageReader
    }

    async Execute(params : { [key: string]: string }, output : ISender) {
        if (params.q === undefined) {
            output.send(
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
        output.send(html)
    }
}