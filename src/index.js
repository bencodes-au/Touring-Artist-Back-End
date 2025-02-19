const dotenv = require("dotenv")
dotenv.config()

const { app } = require("./server");

const venueRouter = require("./routes/venueRoutes");
app.use("/venues", venueRouter)

// consider moving port functionality into main.js which will control database connections 
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log("Server is running on port " + PORT);
});