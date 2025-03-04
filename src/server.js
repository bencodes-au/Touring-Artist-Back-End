const express = require("express");
const cors = require("cors");
const venueRouter = require("./routes/venueRoutes");
const userRouter = require("./routes/userRoutes");
const bookingRouter = require("./routes/bookingRoutes");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/venues", venueRouter);
app.use("/users", userRouter);
app.use("/bookings", bookingRouter);

// hello world test function
app.get("/", (request, response) => {
  response.json({
    message: "Hello, world!",
  });
});

app.get("/databaseHealth", (request, response) => {
  let databaseState = mongoose.connection.readyState;
  let databaseName = mongoose.connection.name;
  let databaseModels = mongoose.connection.modelNames();
  let databaseHost = mongoose.connection.host;

  response.json({
    readyState: databaseState,
    name: databaseName,
    models: databaseModels,
    host: databaseHost,
  });
});

// Catches routes that do not match
app.get("*", (request, response) => {
  console.log("User tried to visit " + request.path);
  response.json({
    message: "Page not found.",
    attemptedPath: request.path,
  });
});

// Catch all errors that have occurred
app.use((error, request, response, next) => {
  console.log("Error occured in the server.");
  console.log(JSON.stringify(error));
  response.json({
    message: error.message,
  });
});

module.exports = {
  app,
};
