import { ISender } from "../sender";
import { IStorageWriter } from "../storage";

export class WriteHandler {
    storageWriter : IStorageWriter

    constructor(storageWriter : IStorageWriter) {
        this.storageWriter = storageWriter
    }

    async Execute(params : { [key: string]: string }, output : ISender) {
        if (Object.keys(params).length === 0) {
            output.send(
                "usage: any number of GET params 'key=value'<br/>" +
                "example: write?foo=vbar&cat=dog"
            )
            return

        }

        let html = ""
        for(const key in params) {
            await this.storageWriter.Write(key, params[key])
            html += key + " => " + params[key] + "<br/>"
        }
        output.send(html)
    }
}