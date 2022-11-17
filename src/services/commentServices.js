const Comment = require('../models/Comment');

const createComment = ({ name, text, movie }) => {
  return Comment.create({ name, text, movie });
};

const deleteComment = (id) => {
  return Comment.findByIdAndDelete(id);
};

const deleteAllMovieComments = (movieId) => {
  return Comment.deleteMany({ movie: movieId });
};

module.exports = { createComment, deleteComment, deleteAllMovieComments };
