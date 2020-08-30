import { injectable, inject } from "inversify"
import { IResponse, IJsonStorageWriter, IWriteHandler } from "../interfaces"
import { TYPES } from "../types"

@injectable()
export class WriteHandler implements IWriteHandler {
    storageWriter : IJsonStorageWriter

    constructor(
        @inject(TYPES.IJsonStorageWriter) storageWriter : IJsonStorageWriter
    ) {
        this.storageWriter = storageWriter
    }

    async Execute(params : { [key: string]: string }, output : IResponse) {
        if (Object.keys(params).length === 0) {
            output.Send(
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
        output.Send(html)
    }
}