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
  movie: {
    type: 'ObjectId',
    ref: 'Category',
  },
});

module.exports = mongoose.model('Comment', CommentScheme);
