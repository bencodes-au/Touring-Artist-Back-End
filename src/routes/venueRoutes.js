const express = require("express")

const {
    getVenues,
    getVenue, 
    createVenue,
    deleteVenue, 
    updateVenue
} = require("../controllers/venueControllers")

const venueRouter = express.Router()

// GET Venues
venueRouter.get("/", async (request, response) => {
    const venues = await getVenues()
    response.json(venues)
});

// Get a Venue
venueRouter.get("/:venueId", async (request, response) => {
    const venue = await getVenue(request.params.venueId)
    // return response.json(venueId)
    if (venue) {
        response.json(venue)
    } else {
        response.status(404).json({error: 'Venue with id ${req.params.postId} not found'})
    }
})

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

// PATCH Venue
venueRouter.patch("/:venueId", async (request, response) => {
    const updatedVenue = await updateVenue(request.params.venueId, request.body)
    if (updatedVenue) {
        response.json(updatedVenue)
    } else {
        response.status(404).json({error: `Venue with id ${request.params.venueId} not found`})
    }
})

// DELETE Venue
venueRouter.delete("/:venueId", async (request, response) => {
    const deletedVenue = await deleteVenue(request.params.venueId)
    if (deletedVenue) {
        response.json(deletedVenue)
    } else {
        response.status(404).json({error: `Venue with id ${request.params.postId} not found`})
    }
})

module.exports = venueRouter