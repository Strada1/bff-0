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
<<<<<<< HEAD
    type: 'ObjectId',
=======
    type: mongoose.Schema.Types.ObjectId,
>>>>>>> main
    ref: 'Movie',
  },
});

module.exports = mongoose.model('Comment', CommentScheme);
