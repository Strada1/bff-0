const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: String,
    year: Number,
    duration: String,
    director: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Director'
    },
    rating: Number,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Movie", MovieSchema);
