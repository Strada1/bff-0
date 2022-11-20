const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  userName: String,
  text: String,
  movie: { type: 'ObjectId', ref: 'Movie' },
});

const Comment = mongoose.model('Comments', CommentSchema);

module.exports = Comment;
