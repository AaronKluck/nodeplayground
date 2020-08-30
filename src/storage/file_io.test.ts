import "reflect-metadata";
import { FileIo } from "./file_io";
import * as fs from "fs"

const testFile = "./data/testfile"

test('Read', async () => {
    try { fs.unlinkSync(testFile) } catch(e) { }
    fs.writeFileSync(testFile, "read this data")

    let fileIo = new FileIo(testFile)
    let data = await fileIo.Read();

    expect(data.toString()).toBe("read this data")
})

test('Write', async () => {
    try { fs.unlinkSync(testFile) } catch(e) { }

    let fileIo = new FileIo(testFile)
    await fileIo.Write("write this data")

    expect((await fileIo.Read()).toString()).toBe("write this data")
})