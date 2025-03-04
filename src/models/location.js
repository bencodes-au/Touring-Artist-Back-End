const mongoose = require("mongoose");

const LocationSchema = mongoose.Schema(
  {
    city: { type: String, required: true, unique: false },
  },
  { timestamps: true }
);

const LocationModel = mongoose.model("Location", LocationSchema);

module.exports = LocationModel;
