const dotenv = require("dotenv");
dotenv.config();

const { app } = require("./server");
const venueRouter = require("./routes/venueRoutes");
const mongoose = require("mongoose");

app.use("/venues", venueRouter);

// consider moving port functionality into main.js which will control database connections
const PORT = process.env.PORT || 3000;

// connects the db on app start
app.listen(PORT, async () => {
  console.log("Server is running on port " + PORT);
  await mongoose.connect("mongodb://127.0.0.1:27017/touring_artist_db");
  console.log("Database Connected");
});
