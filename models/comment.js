const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  text: String,
  movieId: { type: 'ObjectId', ref: 'Movie' },
  userId: { type: 'ObjectId', ref: 'User' },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comment', CommentSchema);
