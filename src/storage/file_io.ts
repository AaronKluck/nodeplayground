import { injectable, inject } from "inversify";
import { promisify } from "util";
import { TYPES } from "../types"
import * as fs from "fs"

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

@injectable()
export class FileIo {
    path : fs.PathLike

    constructor(
        @inject(TYPES.storagePath) path : fs.PathLike
    ) {
        this.path = path
    }

    async Read() : Promise<Buffer> {
        return await readFile(this.path)
    }

    async Write(data: string | NodeJS.ArrayBufferView) : Promise<void> {
        await writeFile(this.path, data)
    }
}