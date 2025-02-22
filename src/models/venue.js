const mongoose = require("mongoose")

const VenueSchema = mongoose.Schema({
    name: String, 
    address: String,
    phone: String,
    price: String,
    // genre: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "Genre"
    // },
    // location: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "Location"
    // },
})

const VenueModel = mongoose.model("Venue", VenueSchema)

module.exports = VenueModel