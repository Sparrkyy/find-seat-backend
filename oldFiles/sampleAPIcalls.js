const axios = require("axios");

/**
 * API that seems to get the official class name called a cnKEY
 */
const StringToFilter = async () => {
	const StringToFiler = await axios.get(
		"https://vsb.mcgill.ca/vsb/api/stringToFilter?term=202109&input=COMP+273&current=&isimport=0&_=1624485942193"
	);
	console.log(StringToFiler.data);
};

/**
 * API call that seems totaly useless, returns a doctype html thing? with a Arbitraty return?
 */
const RealtimeJSP = async () => {
	const rjsp = await axios.get(" https://vsb.mcgill.ca/vsb/realtime.jsp?_=1624485942194");
	console.log(rjsp.data);
};

/**
 * API call for getting class data
 */
const getClassData = async () => {
	// const classData = await axios.get(
	// 	"https://vsb.mcgill.ca/vsb/getclassdata.jsp?term=202109&course_0_0=COMP-273&rq_0_0=null&t=772&e=29&nouser=1&_=1624485942195"
	// );
	// const classData = await fetch(
	// 	"https://vsb.mcgill.ca/vsb/getclassdata.jsp?term=202109&course_0_0=COMP-273&rq_0_0=null&t=772&e=29&nouser=1&_=1624485942195"
	// );
	const classData = await axios.get(
		"https://vsb.mcgill.ca/vsb/getclassdata.jsp?term=202109&course_0_0=COMP-273&rq_0_0=null&t=790&e=46&nouser=1&_=1624487419706"
	);
	console.log(classData.data);
};

getClassData();
