const VenueModel = require("../models/venue")

async function getVenues() {
    const venues = await VenueModel.find()
    return venues
}

// async function createVenue(bodyData) {
//     const newVenue = await VenueModel.create(bodyData)
//     return newVenue
// }

async function createVenue(venue) {
    const newVenue = await VenueModel.create(venue)
    return newVenue
}

module.exports = {
    getVenues,
    createVenue
}