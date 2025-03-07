const mongoose = require("mongoose");
const Venue = require("../models/venue");

const { databaseConnect } = require("../database");

// Connect to the DB
async function seedDatabase() {
  await databaseConnect();
  console.log("Connected to database");

  await Venue.deleteMany();
  console.log("Inserting new data...");

  const venueData = [
    {
      name: "Rock Stadium Sydney",
      address: "123 Main St",
      phone: "1234567890",
      price: "500",
      genre: "Rock",
      location: "Sydney",
    },
    {
      name: "Jazz Club Melbourne",
      address: "456 Broadway",
      phone: "9876543210",
      price: "300",
      genre: "Jazz",
      location: "Melbourne",
    },
    {
      name: "Pop Arena Brisbane",
      address: "789 Pop St",
      phone: "1122334455",
      price: "700",
      genre: "Pop",
      location: "Brisbane",
    },
    {
      name: "Hip-Hop Center Perth",
      address: "101 Hip-Hop Rd",
      phone: "9988776655",
      price: "600",
      genre: "Hip-Hop",
      location: "Perth",
    },
    {
      name: "Classical Hall Adelaide",
      address: "202 Classical Blvd",
      phone: "2233445566",
      price: "800",
      genre: "Classical",
      location: "Adelaide",
    },
  ];

  // Insert venues into the database
  await Venue.insertMany(venueData);
  console.log("Venues inserted.");

  console.log("Seeding complete!");
  mongoose.connection.close();
}

seedDatabase();
