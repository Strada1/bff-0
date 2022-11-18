const { ObjectId } = require('mongodb');
const mongoose = require('../db.js');

const CommentSchema = mongoose.Schema({
  user: String,
  text: String,
  createdAt: {type: Date, default: Date.now},
  movie: { type: ObjectId, ref: 'Movie' },
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
