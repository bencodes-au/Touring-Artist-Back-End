const BookingModel = require("../models/booking");
const User = require("../models/user");
const Venue = require("../models/venue");

async function getBookings() {
  try {
    const bookings = await BookingModel.find()
      .populate("user")
      .populate("venue");
    return bookings;
  } catch (error) {
    console.error("Error in getBookings:", error.message);
    throw new Error("Failed to fetch bookings");
  }
}

async function getBooking(bookingId) {
  try {
    const booking = await BookingModel.findById(bookingId)
      .populate("user")
      .populate("venue");
    if (!booking) {
      throw new Error("Booking not found");
    }
    return booking;
  } catch (error) {
    console.error("Error in getBooking:", error.message);
    throw new Error(`Booking with id ${request.params.bookingId} not found`);
  }
}

async function createBooking(req, res) {
  const { venue, date, artist, paidUpfront, user } = req.body;

  try {
    // Check if there is already a booking for the same venue and date
    const existingBooking = await BookingModel.findOne({ venue, date });

    if (existingBooking) {
      // If booking exists, return error message
      return res
        .status(400)
        .json({ error: "This venue has been booked on this date." }); // Send error message to frontend
    }

    // Create the new booking if no conflicts
    const newBooking = new BookingModel({
      venue,
      date,
      artist,
      paidUpfront,
      user,
    });

    await newBooking.save();

    res.status(201).json({ message: "Booking successful!" }); // Success response
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "There was an error making the booking." });
  }
}

async function updateBooking(bookingId, bodyData) {
  try {
    const updatedBooking = await BookingModel.findByIdAndUpdate(
      bookingId,
      bodyData,
      { new: true }
    );
    if (!updatedBooking) {
      throw new Error(`Booking with id ${request.params.bookingId} not found`);
    }
    return updatedBooking;
  } catch (error) {
    console.error("Error in updateBooking:", error.message);
    throw new Error("Failed to update booking");
  }
}

async function deleteBooking(bookingId) {
  try {
    const deletedBooking = await BookingModel.findByIdAndDelete(bookingId);
    if (!deletedBooking) {
      throw new Error(`Booking with id ${request.params.bookingId} not found`);
    }
    return deletedBooking;
  } catch (error) {
    console.error("Error in deleteBooking:", error.message);
    throw new Error("Failed to delete booking");
  }
}

module.exports = {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
};
