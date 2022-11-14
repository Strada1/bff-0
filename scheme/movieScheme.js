const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/stradaDev";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const MovieSchema = new mongoose.Schema(
  {
    title: String,
    year: Number,
    rating: Number,
    category: String,
    director: String
  },
  { collection: "films" }
);

const Movie = mongoose.model("Movie", MovieSchema);

module.exports = Movie;
