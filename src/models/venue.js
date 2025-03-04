const mongoose = require("mongoose");

const VenueSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    address: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    price: { type: String, required: true, unique: false },
    genre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre",
      required: false,
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
  },
  { timestamps: true }
);

const VenueModel = mongoose.model("Venue", VenueSchema);

module.exports = VenueModel;
