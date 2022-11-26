const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const DirectorSchema = new mongoose.Schema(
  {
    name: String,
    movies: [{ type: ObjectId, ref: "Movie" }],
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Director", DirectorSchema);
