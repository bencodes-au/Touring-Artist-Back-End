const mongoose = require("mongoose");

async function databaseConnect() {
  try {
    const connectionString = import.meta.env.VITE_DATABASE_URL;
    console.log("Starting database connection!");
    await mongoose.connect(connectionString);
    console.log("Connected to database!");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}

module.exports = { databaseConnect };
