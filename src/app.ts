import express, { Router } from "express";
import config from "config";
import log from "./logger";
//import connect from "./db/connect";
import routerSample from "./routers/testerRoute";
import classDataRouter from "./routers/classDataRoute";

const port = config.get("port") as number;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/test", routerSample);
app.use("/class_data", classDataRouter);

app.listen(port, () => {
	log.info(`Server is listing on http://localhost:${port}`);
	//connect();
});
