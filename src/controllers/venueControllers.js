const VenueModel = require("../models/venue");
const Genre = require("../models/genre");
const Location = require("../models/location");

async function getVenues() {
  try {
    const venues = await VenueModel.find()
      .populate("genre")
      .populate("location");
    return venues;
  } catch (error) {
    console.error("Error in getVenues:", error.message);
    throw new Error("Failed to fetch venues");
  }
}

async function getVenue(venueId) {
  try {
    const venue = await VenueModel.findById(venueId);
    if (!venue) {
      throw new Error("Venue not found");
    }
    return venue;
  } catch (error) {
    console.error("Error in getVenue:", error.message);
    throw new Error("Failed to fetch venue");
  }
}

async function createVenue(venue) {
  try {
    const newVenue = await VenueModel.create(venue);
    return newVenue;
  } catch (error) {
    console.error("Error in createVenue:", error.message);
    throw new Error("Failed to create venue");
  }
}

async function updateVenue(venueId, bodyData) {
  try {
    const updatedVenue = await VenueModel.findByIdAndUpdate(venueId, bodyData, {
      new: true,
    });
    if (!updatedVenue) {
      throw new Error("Venue not found");
    }
    return updatedVenue;
  } catch (error) {
    console.error("Error in updateVenue:", error.message);
    throw new Error("Failed to update venue");
  }
}

async function deleteVenue(venueId) {
  try {
    const deletedVenue = await VenueModel.findByIdAndDelete(venueId);
    if (!deletedVenue) {
      throw new Error("Venue not found");
    }
    return deletedVenue;
  } catch (error) {
    console.error("Error in deleteVenue:", error.message);
    throw new Error("Failed to delete venue");
  }
}

module.exports = {
  getVenues,
  getVenue,
  createVenue,
  updateVenue,
  deleteVenue,
};
