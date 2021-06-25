import express, { Router } from "express";
import config from "config";
import log from "./logger";
//import connect from "./db/connect";
import routerSample from "./routes";

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routerSample);

app.listen(port, () => {
	log.info(`Server is listing on http://localhost:${port}`);
	//connect();
});
