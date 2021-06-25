const getTandE = () => {
	const f8b0 = ["\x26\x74\x3D", "\x26\x65\x3D"];
	console.log(f8b0);
	const t = Math.floor(new Date() / 60000) % 1000;
	console.log(t);
	const e = (t % 3) + (t % 19) + (t % 42);
	console.log(t);
	return f8b0[0] + t + f8b0[1] + e;
};

console.log(getTandE());
