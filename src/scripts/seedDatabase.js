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
      name: "Rock Sydney",
      address: "123 Main St",
      phone: "1234567890",
      price: "5000",
      genre: "Rock",
      location: "Sydney",
    },
    {
      name: "Classical Sydney",
      address: "120 Plain St",
      phone: "1234567890",
      price: "7100",
      genre: "Classical",
      location: "Sydney",
    },
    {
      name: "Jazz Melbourne",
      address: "456 Example Road",
      phone: "9876543210",
      price: "3400",
      genre: "Jazz",
      location: "Melbourne",
    },
    {
      name: "Rock Melbourne",
      address: "896 Whatever Road",
      phone: "784512369",
      price: "1200",
      genre: "Rock",
      location: "Melbourne",
    },
    {
      name: "Pop Brisbane",
      address: "789 Another St",
      phone: "1122334455",
      price: "8700",
      genre: "Pop",
      location: "Brisbane",
    },
    {
      name: "Jazz Brisbane",
      address: "456 Imaginary Road",
      phone: "963258741",
      price: "4000",
      genre: "Jazz",
      location: "Brisbane",
    },
    {
      name: "Hip-Hop Perth",
      address: "101 Hip-Hop Rd",
      phone: "9988776655",
      price: "6800",
      genre: "Hip-Hop",
      location: "Perth",
    },
    {
      name: "Pop Perth",
      address: "202 Fremantle Rd",
      phone: "222555888",
      price: "2200",
      genre: "Pop",
      location: "Perth",
    },
    {
      name: "Classical Adelaide",
      address: "202 Classical Blvd",
      phone: "2233445566",
      price: "3800",
      genre: "Classical",
      location: "Adelaide",
    },
    {
      name: "Hip-Hop Adelaide",
      address: "101 Hip-Hop Rd",
      phone: "0415258741",
      price: "6300",
      genre: "Hip-Hop",
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
