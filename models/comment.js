const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new mongoose.Schema({
  text: String,
  movieId: { type: Schema.Types.ObjectId, ref: 'Movie' },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comment', CommentSchema);
