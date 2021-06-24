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
	const cnf = { cnKey: "COMP-273", reqId: null };
	s += "&course_" + i + "_0=" + cnf.cnKey;
	s += "&rq_" + i + "_0=" + cnf.reqId;
	return s;
};

const getTerm = () => {
	return "term=202109";
};

//getclassdata.jsp?term=202109&course_0_0=COMP-273&rq_0_0=null&t=641&e=27

const getAPIURL = () => {
	console.log(getOldest());
	return "getclassdata.jsp?" + getTerm() + getCNFInfo() + getTandE() + "&nouser=1" + "&_=" + getOldest();
};

console.log(getAPIURL());
