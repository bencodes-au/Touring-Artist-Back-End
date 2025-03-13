const express = require("express");
const bookingRouter = express.Router();

const authenticationToken = require("../middleware/authMiddleware");

const {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
  getBookingsForUser,
} = require("../controllers/bookingControllers");

// GET all Bookings (Protected)
bookingRouter.get("/", authenticationToken, async (request, response) => {
  try {
    const bookings = await getBookings();
    response.status(200).json(bookings);
  } catch (error) {
    console.error("Error in GET /bookings:", error.message);
    response.status(500).json({ error: "Failed to retrieve bookings" });
  }
});

// GET a single Booking (Protected)
bookingRouter.get(
  "/:bookingId",
  authenticationToken,
  async (request, response) => {
    try {
      const booking = await getBooking(request.params.bookingId);
      if (booking) {
        response.status(200).json(booking);
      } else {
        response.status(404).json({
          error: `Booking with id ${request.params.bookingId} not found`,
        });
      }
    } catch (error) {
      console.error("Error in GET /bookings/:bookingId:", error.message);
      response.status(500).json({ error: "Failed to retrieve booking" });
    }
  }
);

// POST a new Booking (Protected)
bookingRouter.post("/", authenticationToken, async (request, response) => {
  try {
    const bodyData = {
      date: request.body.date,
      artist: request.body.artist,
      paidUpfront: request.body.paidUpfront,
      user: request.user.id,
      venue: request.body.venue,
    };

    const newBooking = await createBooking(bodyData);
    response.status(201).json(newBooking);
  } catch (error) {
    console.error("Error in POST /bookings:", error.message);
    response.status(500).json({ error: "Failed to create booking" });
  }
});

// PATCH (Update) a Booking (Protected)
bookingRouter.patch(
  "/:bookingId",
  authenticationToken,
  async (request, response) => {
    try {
      const updatedBooking = await updateBooking(
        request.params.bookingId,
        request.body
      );
      if (updatedBooking) {
        response.status(200).json(updatedBooking);
      } else {
        response.status(404).json({
          error: `Booking with id ${request.params.bookingId} not found`,
        });
      }
    } catch (error) {
      console.error("Error in PATCH /bookings/:bookingId:", error.message);
      response.status(500).json({ error: "Failed to update booking" });
    }
  }
);

// DELETE a Booking (Protected)
bookingRouter.delete(
  "/:bookingId",
  authenticationToken,
  async (request, response) => {
    try {
      const deletedBooking = await deleteBooking(request.params.bookingId);
      if (deletedBooking) {
        response.status(200).json(deletedBooking);
      } else {
        response.status(404).json({
          error: `Booking with id ${request.params.bookingId} not found`,
        });
      }
    } catch (error) {
      console.error("Error in DELETE /bookings/:bookingId:", error.message);
      response.status(500).json({ error: "Failed to delete booking" });
    }
  }
);

// Get bookings for User
bookingRouter.get(
  "/user/:userId",
  authenticationToken,
  async (request, response) => {
    try {
      const bookings = await getBookingsForUser(request.params.userId);

      response.status(200).json(bookings);
    } catch (error) {
      console.error("Error in GET /bookings/user/:userId:", error.message);
      response.status(500).json({ error: "Failed to retrieve bookings" });
    }
  }
);

module.exports = bookingRouter;
