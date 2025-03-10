const mongoose = require("mongoose");

const BookingSchema = mongoose.Schema(
  {
    date: { type: String, required: true, unique: false },
    artist: { type: String, required: false },
    paidUpfront: { type: Boolean, default: false },
    user: { type: String, required: true },
    venue: { type: String, required: true },
  },
  { timestamps: true }
);

const BookingModel = mongoose.model("Booking", BookingSchema);

module.exports = BookingModel;
