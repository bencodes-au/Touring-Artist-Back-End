const BookingModel = require("../models/booking");

async function getBookings() {
  try {
    const bookings = await BookingModel.find();
    return bookings;
  } catch (error) {
    console.error("Error in getBookings:", error.message);
    throw new Error("Failed to fetch bookings");
  }
}

async function getBooking(bookingId) {
  try {
    const booking = await BookingModel.findById(bookingId);
    if (!booking) {
      throw new Error("Booking not found");
    }
    return booking;
  } catch (error) {
    console.error("Error in getBooking:", error.message);
    throw new Error(`Booking with id ${bookingId} not found`);
  }
}

async function createBooking(booking) {
  try {
    const newBooking = await BookingModel.create(booking);
    return newBooking;
  } catch (error) {
    console.error("Error in createBooking:", error.message);
    throw new Error("Failed to create booking");
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

async function getBookingsForUser(userId) {
  try {
    const bookings = await BookingModel.find({ user: userId }).exec();
    if (!bookings || bookings.length === 0) {
      throw new Error("No bookings found for this user");
    }
    return bookings;
  } catch (error) {
    console.error("Error in getBookingsForUser:", error.message);
    throw new Error(`Error retrieving bookings for user ${userId}`);
  }
}

module.exports = {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
  getBookingsForUser,
};
