import bodyParser from "body-parser";
import express, { Express } from "express";
import "./config";
import "./database/connection";
import router from "./routes/index";
import { errorMiddleware } from "./utils/error";

const app: Express = express();
app.use(bodyParser.json());
app.use("/", router);
app.use(errorMiddleware);

export { app };
