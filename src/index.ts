import { myContainer } from "./inversify.config";
import express from "express";
import { TYPES } from "./types";
import { Controller } from "./controller"

const app = express();
const port = 8080;

const controller = myContainer.get<Controller>(TYPES.Controller)

app.get( "/", async (req, res) => {
    await controller.Root(req, res)
});

app.get( "/read", async (req, res) => {
    await controller.Read(req, res)
});

app.get( "/write", async (req, res) => {
    await controller.Write(req, res)
});

app.listen(port);
