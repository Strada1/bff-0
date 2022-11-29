const { ObjectId } = require('mongodb');
const mongoose = require('../db');

const CommentSchema = new mongoose.Schema(
  {
    text: String,
    author: String,
    createdAt: {type: Date, default: Date.now},
    updatedAt: Date,
    movie: { type: ObjectId, ref: 'Movie' },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('Comment', CommentSchema);