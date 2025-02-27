const mongoose = require('mongoose');

async function databaseConnect() {
    try {
        const connectionString = process.env.MONGO_URI || 'mongodb://localhost:27017/touring_artist_db';
        console.log("Starting database connection!");
        await mongoose.connect(connectionString);
        console.log("Connected to database!");
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
}

module.exports = { databaseConnect };
