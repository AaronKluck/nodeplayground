import { promisify } from "util";
import * as fs from "fs"

export interface IStorageReader {
    Read(key : string) : Promise<string>
    ReadAll() : Promise<{[key : string]: string}>
}

export interface IStorageWriter {
    Write(key : string, value : string) : Promise<void>
}

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

export class Storage {
    path : fs.PathLike

    constructor(path : fs.PathLike) {
        this.path = path
    }

    async Read(key : string) : Promise<string> {
        const json = JSON.parse((await readFile(this.path)).toString())
        const value = json[key]
        if (typeof value === "string") {
            return value
        }
        return ""
    }

    async ReadAll() : Promise<{[key : string]: string}> {
        const all : {[key: string]: string} = {}
        const json = JSON.parse((await readFile(this.path)).toString())
        for(const key in json){
            const value = json[key]
            if (typeof value === "string") {
                all[key] = value
            }
        }
        return all
    }

    async Write(key : string, value : string) : Promise<void> {
        const json = JSON.parse((await readFile(this.path)).toString())
        json[key] = value
        await writeFile(this.path, JSON.stringify(json))
    }
}