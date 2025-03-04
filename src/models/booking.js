const mongoose = require("mongoose");

const BookingSchema = mongoose.Schema(
  {
    date: { type: String, required: true, unique: true },
    artist: { type: String, required: false },
    paidUpfront: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    venue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Venue",
      required: true,
    },
  },
  { timestamps: true }
);

const BookingModel = mongoose.model("Booking", BookingSchema);

module.exports = BookingModel;
