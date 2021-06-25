import express, { Express, Request, Response, Router } from "express";
import axios, { ResponseType } from "axios";
import log from "../logger";
const router = express.Router() as Router;

router.get("/get", async (req: Request, res: Response) => {
	try {
		if (!req.body.cnKey) {
			res.status(400).send("please give a cnKey");
		}
		const baseURL = "https://vsb.mcgill.ca/vsb/getclassdata.jsp?";
		const term = get_Term();
		const CNF_Info = get_CNF_Info(req.body.cnKey);
		const T_and_E = get_T_and_E_params();
		const nouser_String = "&nouser=1";
		const oldest = "&_=" + new Date().getTime();
		const full_URL = baseURL + term + CNF_Info + T_and_E + nouser_String + oldest;
		const VSB_api_call_reponse = await axios.get(full_URL);
		const classData = parse_xml_course_data(VSB_api_call_reponse.data);
		res.status(200).send(classData);
	} catch (e) {
		log.info(e);
		res.status(500).send("Error occured");
	}
});

const get_Term = () => {
	return "term=202109";
};

const get_CNF_Info = (cnKey: string) => {
	let s = "";
	const i = 0;
	const cnf = { cnKey: cnKey, reqId: null };
	s += "&course_" + i + "_0=" + cnf.cnKey;
	s += "&rq_" + i + "_0=" + cnf.reqId;
	return s;
};

const get_T_and_E_params = () => {
	const f8b0 = ["\x26\x74\x3D", "\x26\x65\x3D"];
	const t = Math.floor(new Date().getTime() / 60000) % 1000;
	const e = (t % 3) + (t % 19) + (t % 42);
	return f8b0[0] + t + f8b0[1] + e;
};

const get_Oldest = () => {
	return new Date().getTime();
};

const parse_xml_course_data = (xml: string) => {
	const regexForCourses = /<block[\S ]*/gm;
	const courses = xml.match(regexForCourses);
	const AllCourseResults: any[] = [];
	courses!.forEach((course) => {
		/**
		 * @todo fit this any
		 */
		const singleCourse: any = {};
		const regexForSingleCourse = /[A-Za-z]*="[^"]*"/gm;
		const courseAttributes = course.match(regexForSingleCourse);
		courseAttributes!.forEach((attribute) => {
			const regexForSingleAttribute = /[^"=]+/gm;
			const twoParts: IterableIterator<string> = attribute.match(regexForSingleAttribute)!.values();
			const classAttrTitle: string = twoParts.next().value;
			const classAttrValue: string = twoParts.next().value;
			if (classAttrTitle) {
				singleCourse[classAttrTitle] = classAttrValue;
			}
		});
		AllCourseResults.push(singleCourse);
	});
	return AllCourseResults;
};

export default router;
