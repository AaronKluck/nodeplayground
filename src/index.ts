import express from "express";
import { Sender } from "./sender";
import { Controller } from "./controller";
import { RootHandler, FooHandler, BarHandler } from "./handler";


let senderFactory = function (res : express.Response) {
    return new Sender(res);
};

const app = express();
const port = 8080; // default port to listen

let controller = new Controller(senderFactory, new RootHandler(), new FooHandler(), new BarHandler())

app.get( "/", (req, res) => {
    controller.root(req, res)
});

app.get( "/foo", (req, res) => {
    controller.foo(req, res)
});

app.get( "/bar", (req, res) => {
    controller.bar(req, res)
});

// start the Express server
app.listen(port);
