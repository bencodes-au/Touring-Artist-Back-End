const mongoose = require("mongoose")

const GenreSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true }
    },
    {timestamps: true}
);

const GenreModel = mongoose.model("Genre", GenreSchema)

module.exports = GenreModel