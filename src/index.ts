import express from "express";
import { Sender } from "./sender";
import { Controller } from "./controller";
import { RootHandler } from "./handler/root"
import { ReadHandler } from "./handler/read"
import { WriteHandler } from "./handler/write"
import { Storage } from "./storage";


function senderFactory(res : express.Response) {
    return new Sender(res);
};

const app = express();
const port = 8080; // default port to listen

const storage = new Storage("./data/storage.json")

const controller = new Controller(
    senderFactory,
    new RootHandler(storage),
    new ReadHandler(storage),
    new WriteHandler(storage)
)

app.get( "/", async (req, res) => {
    await controller.root(req, res)
});

app.get( "/read", async (req, res) => {
    await controller.foo(req, res)
});

app.get( "/write", async (req, res) => {
    await controller.bar(req, res)
});

app.listen(port);
