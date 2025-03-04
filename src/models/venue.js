const mongoose = require("mongoose")

const VenueSchema = mongoose.Schema({
    name: {type: String, required: true, unique: true},
    address: {type: String, required: true, unique: true},
    phone: {type: String, required: true, unique: true},
    price: {type: String, required: true, unique: false},
    genre: {type: mongoose.Types.ObjectId, ref: "Genre"},
    location: {type: mongoose.Types.ObjectId, ref: "Location"}
    },
    {timestamps: true} 
)

const VenueModel = mongoose.model("Venue", VenueSchema)

module.exports = VenueModel