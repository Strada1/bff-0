const db = require('../ext/db');

const CommentSchema = new db.Schema({
  movie: { type: 'ObjectId', ref: 'Movie' },
  text: String,
  user: String,
});

module.exports = db.model('Comment', CommentSchema);
