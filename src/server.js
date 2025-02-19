const express = require("express");

const app = express();

app.get("/", (request, response) => {
	response.json({
		message: "Hello, world!"
	});
});


// Catches routes that do not match
app.get("*", (request, response) => {
	console.log("User tried to visit " + request.path);
	response.json({
		message:"Page not found.",
		attemptedPath: request.path
	});
});


// Catch all error occurred
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