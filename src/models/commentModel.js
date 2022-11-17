const { createModel } = require('../services/modelService');

const CommentSchema = {
  comment: String,
  movieId: { type: 'ObjectId', ref: 'Movie' },
};

module.exports = createModel('Comment', CommentSchema);
