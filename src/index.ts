import express from "express"
import { TYPES } from "./types"
import { container } from "./inversify.config"
import { KeyValueController } from "./controller/keyvalue_controller"

const app = express();
const port = 8080;

// This single line resolves our entire dependency graph
const controller = container.get<KeyValueController>(TYPES.Controller)

// Map endpoints to controller methods
app.get( "/", async (req, res) => {
    await controller.Root(req, res)
});

app.get( "/read", async (req, res) => {
    await controller.Read(req, res)
});

app.get( "/write", async (req, res) => {
    await controller.Write(req, res)
});

// Start the server
app.listen(port);
