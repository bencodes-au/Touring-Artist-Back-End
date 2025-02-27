const mongoose = require("mongoose")
const Genre = require("../models/genre")
const Location = require("../models/location")
const Venue = require("../models/venue")

const { genres, locations } = require("./defaultData")
const { databaseConnect } = require("../database")

// Connect to the DB
async function seedDatabase() {
    await databaseConnect()
    console.log("Connected to database")

    // Clear existing data
    await Genre.deleteMany()
    await Location.deleteMany()
    await Venue.deleteMany()
    console.log("Inserting new data...")

    // get mongodb 
    const genreDocs = await Genre.insertMany(genres)
    console.log(`Genres inserted.`)

    const locationDocs = await Location.insertMany(locations)
    console.log(`Locations inserted.`)

    // Function to get object entities for documents
    const getGenreIdByName = (name) => genreDocs.find(genre => genre.name === name)._id
    const getLocationIdByCity = (city) => locationDocs.find(location => location.city === city)._id

    // Venue Data using ID references from getExampleIdByName
    const venueData = [
    {
        name: "Rock Stadium",
        address: "123 Main St",
        phone: "1234567890",
        price: "500",
        genre: getGenreIdByName("Rock"), 
        location: getLocationIdByCity("Sydney") 
    },
    {
        name: "Jazz Club",
        address: "456 Broadway",
        phone: "9876543210",
        price: "300",
        genre: getGenreIdByName("Jazz"), 
        location: getLocationIdByCity("Melbourne") 
    },
    {
        name: "Pop Arena",
        address: "789 Pop St",
        phone: "1122334455",
        price: "700",
        genre: getGenreIdByName("Pop"), 
        location: getLocationIdByCity("Brisbane") 
    },
    {
        name: "Hip-Hop Center",
        address: "101 Hip-Hop Rd",
        phone: "9988776655",
        price: "600",
        genre: getGenreIdByName("Hip-Hop"), 
        location: getLocationIdByCity("Perth") 
    },
    {
        name: "Classical Hall",
        address: "202 Classical Blvd",
        phone: "2233445566",
        price: "800",
        genre: getGenreIdByName("Classical"),  
        location: getLocationIdByCity("Adelaide") 
    }
    ];

    // Insert venues into the database
    await Venue.insertMany(venueData)
    console.log("Venues inserted.")

    console.log("Seeding complete!")
    mongoose.connection.close()
}

seedDatabase()
