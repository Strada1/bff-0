const mongoose = require('mongoose');

const CommentScheme = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  movie: {
    type: 'ObjectId',
    ref: 'Movie',
  },
});

module.exports = mongoose.model('Comment', CommentScheme);
