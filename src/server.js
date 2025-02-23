const express = require("express");
const venueRouter = require("./routes/venueRoutes");
const userRouter = require("./routes/userRoutes")
const app = express();

app.use(express.json())

// hello world test function
app.get("/", (request, response) => {
	response.json({
		message: "Hello, world!"
	});
});

app.use("/venues", venueRouter)
app.use("/users", userRouter)

// Catches routes that do not match
app.get("*", (request, response) => {
	console.log("User tried to visit " + request.path);
	response.json({
		message:"Page not found.",
		attemptedPath: request.path
	});
});


// Catch all errors that have occurred
app.use((error, request, response, next) => {
	console.log("Error occured in the server.");
	console.log(JSON.stringify(error));
	response.json({
		message: error.message
	});
});

module.exports = {
	app
}