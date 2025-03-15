const dotenv = require("dotenv");
dotenv.config();

const { app } = require("./server");
const venueRouter = require("./routes/venueRoutes");
const mongoose = require("mongoose");

app.use("/venues", venueRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log("Server is running on port " + PORT);
  await mongoose.connect(process.env.DATABASE_URL);
  console.log("Database Connected");
});
