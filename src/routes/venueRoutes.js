const express = require("express");

const {
  getVenues,
  getVenue,
  createVenue,
  deleteVenue,
  updateVenue,
} = require("../controllers/venueControllers");

const venueRouter = express.Router();

// GET Venues
venueRouter.get("/", async (request, response) => {
  try {
    const venues = await getVenues();
    response.status(200).json(venues);
  } catch (error) {
    console.error("Error in GET /venues:", error.message);
    response.status(500).json({ error: "Failed to retrieve venues" });
  }
});

// Get a Venue
venueRouter.get("/:venueId", async (request, response) => {
  try {
    const venue = await getVenue(request.params.venueId);
    if (venue) {
      response.status(200).json(venue);
    } else {
      response
        .status(404)
        .json({ error: `Venue with id ${request.params.venueId} not found` });
    }
  } catch (error) {
    console.error("Error in GET /venues/:venueId:", error.message);
    response.status(500).json({ error: "Failed to retrieve venue" });
  }
});

// POST Venue
venueRouter.post("/", async (request, response) => {
  const bodyData = {
    name: request.body.name,
    address: request.body.address,
    phone: request.body.phone,
    price: request.body.price,
    genre: request.body.genre,
    location: request.body.location,
  };

  const newVenue = await createVenue(bodyData);
  response.json(newVenue);
});

// Update Venue
venueRouter.patch("/:venueId", async (request, response) => {
  try {
    const updatedVenue = await updateVenue(
      request.params.venueId,
      request.body
    );
    if (updatedVenue) {
      response.status(200).json(updatedVenue);
    } else {
      response
        .status(404)
        .json({ error: `Venue with id ${request.params.venueId} not found` });
    }
  } catch (error) {
    console.error("Error in PATCH /venues/:venueId:", error.message);
    response.status(500).json({ error: "Failed to update venue" });
  }
});

// DELETE Venue
venueRouter.delete("/:venueId", async (request, response) => {
  try {
    const deletedVenue = await deleteVenue(request.params.venueId);
    if (deletedVenue) {
      response.status(200).json(deletedVenue);
    } else {
      response
        .status(404)
        .json({ error: `Venue with id ${request.params.venueId} not found` });
    }
  } catch (error) {
    console.error("Error in DELETE /venues/:venueId:", error.message);
    response.status(500).json({ error: "Failed to delete venue" });
  }
});

module.exports = venueRouter;
