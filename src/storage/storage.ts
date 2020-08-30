import { injectable, inject } from "inversify";
import { TYPES } from "../types"
import { IFileIo } from "../interfaces";

@injectable()
export class Storage {
    fileIo : IFileIo

    constructor(
        @inject(TYPES.IFileIo) fileIo : IFileIo
    ) {
        this.fileIo = fileIo
    }

    async Read(key : string) : Promise<string> {
        const json = await this.LoadFile()
        const value = json[key]
        if (typeof value === "string") {
            return value
        }
        return ""
    }

    async ReadAll() : Promise<{[key : string]: string}> {
        const json = await this.LoadFile()
        const all : {[key: string]: string} = {}
        for(const key in json){
            const value = json[key]
            if (typeof value === "string") {
                all[key] = value
            }
        }
        return all
    }

    async Write(key : string, value : string) : Promise<void> {
        const json = await this.LoadFile()
        json[key] = value
        await this.fileIo.Write(JSON.stringify(json))
    }

    private async LoadFile() : Promise<any> {
        return JSON.parse((await this.fileIo.Read()).toString())
    }
}