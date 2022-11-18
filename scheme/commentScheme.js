const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie'
    },
    author: String,
    text: String,
    date: String,
    like: Number,
    dislike: Number,
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Comment", CommentSchema);
