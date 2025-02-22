const express = require("express")

const {
    getVenues, 
    createVenue 
} = require("../controllers/venueControllers")

const venueRouter = express.Router()

// GET Venues
venueRouter.get("/", async (request, response) => {
    const venues = await getVenues()
    response.json(venues)
});

// POST Venue
venueRouter.post("/", async (request, response) => {
    const bodyData = {
        name: request.body.name,
        address: request.body.address,
        phone: request.body.phone,
        price: request.body.price
    }

    const newVenue = await createVenue(bodyData)
    response.json(newVenue)
})

module.exports = venueRouter