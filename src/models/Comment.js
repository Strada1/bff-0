const { ObjectId } = require('mongodb');
const mongoose = require('../db.js');

const CommentSchema = mongoose.Schema({
  user: { type: 'ObjectId', ref: 'User'},
  text: String,
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date},
  movie: { type: ObjectId, ref: 'Movie' },
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
