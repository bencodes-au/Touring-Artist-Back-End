const express = require("express")

const { getvenues } = require("../controllers/venueControllers")

const venueRouter = express.Router()

venueRouter.get("/venues", async (request, response) => {
    const venues = await getvenues()
    response.json(venues)
})

module.exports = venueRouter