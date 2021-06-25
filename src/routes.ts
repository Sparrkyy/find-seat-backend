import express, { Express, Request, Response, Router } from "express";
const router = express.Router() as Router;

router.get("/", (req: Request, res: Response) => {
	try {
		res.status(200).send("hello world");
	} catch (e) {
		res.status(500).send();
	}
});

export default router;
