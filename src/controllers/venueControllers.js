const VenueModel = require("../models/venue")
const Genre = require("../models/genre")
const Location = require("../models/location")

async function getVenues() {
    const venues = await VenueModel.find()
    .populate("genre")
    .populate("location")
    return venues
}

async function getVenue(venueId) {
    const venue = await VenueModel.findById(venueId)
    return venue
}

async function createVenue(venue) {
    const newVenue = await VenueModel.create(venue)
    return newVenue
}

async function updateVenue(venueId, bodyData) {
    const updatedVenue = await VenueModel.findByIdAndUpdate(venueId, bodyData, { new: true})
    return updatedVenue
}

async function deleteVenue(venueId) {
    const deletedVenue = await VenueModel.findByIdAndDelete(venueId)
    return deletedVenue
}

module.exports = {
    getVenues,
    getVenue,
    createVenue,
    deleteVenue,
    updateVenue
}