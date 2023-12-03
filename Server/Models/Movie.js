const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: String,
    image: String,
    description: String,
    duration: Number,
  },
  { versionKey: false }
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
