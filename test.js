const axios = require("axios");

const getTandE = () => {
	var f8b0 = ["\x26\x74\x3D", "\x26\x65\x3D"];
	var t = Math.floor(new Date() / 60000) % 1000;
	var e = (t % 3) + (t % 19) + (t % 42);
	return f8b0[0] + t + f8b0[1] + e;
};

const getOldest = () => {
	return new Date().getTime();
};

const getCNFInfo = () => {
	let s = "";
	const i = 0;
	const cnf = { cnKey: "MATH-240", reqId: null };
	s += "&course_" + i + "_0=" + cnf.cnKey;
	s += "&rq_" + i + "_0=" + cnf.reqId;
	return s;
};

const getTerm = () => {
	return "term=202109";
};

const getAPIURL = () => {
	return (
		"https://vsb.mcgill.ca/vsb/getclassdata.jsp?" +
		getTerm() +
		getCNFInfo() +
		getTandE() +
		"&nouser=1" +
		"&_=" +
		getOldest()
	);
};

axios
	.get(getAPIURL())
	.then((res) => {
		const xml = res.data;
		const regexForCourses = /<block[\S ]*/gm;
		const courses = xml.match(regexForCourses);
		const AllCourseResults = [];
		courses.forEach((course) => {
			const singleCourse = {};
			const regexForSingleCourse = /[A-Za-z]*="[^"]*"/gm;
			const courseAttributes = course.match(regexForSingleCourse);
			courseAttributes.forEach((attribute) => {
				const regexForSingleAttribute = /[^"=]+/gm;
				const twoParts = attribute.match(regexForSingleAttribute);
				if (twoParts[1]) {
					singleCourse[twoParts[0]] = twoParts[1];
				}
			});
			AllCourseResults.push(singleCourse);
		});
		console.log(AllCourseResults);
	})
	.catch((error) => {
		console.log("ERROR!!");
		console.log(error);
	});
