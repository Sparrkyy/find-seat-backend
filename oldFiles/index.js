const express = require("express");
// require('./db/mongoose');

// const User = require('./models/users');

// const userRouter = require('./routers/user');

const app = express();
const PORT = process.env.PORT || 3000;

// app.use((req, res, next) => {
// 	if (req.method === 'GET'){

// 	}
// 	console.log(req.method, req.path);
// 	next();
// });
// app.use((req, res, next) => {
// 	res.status(503).send('The server is down for maintence');
// });

app.use(express.json());
app.use("/class_data", require("./routes/classDataRoute"));

app.listen(PORT, () => {
	console.log("server is up on port " + PORT);
});
