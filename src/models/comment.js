const { mongoose } = require('../db');
const { ObjectId } = require('mongodb');

const CommentSchema = new mongoose.Schema({
  text: String,
  movie: { type: ObjectId, ref: 'Movie' },
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = { Comment };
