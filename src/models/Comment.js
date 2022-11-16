const { ObjectId } = require('mongodb');
const mongoose = require('../db.js');

const CommentSchema = mongoose.Schema({
  name: String,
  text: String,
  movie: { type: ObjectId, ref: 'Movie' },
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
