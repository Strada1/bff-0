const Comment = require('../models/Comment');

const createComment = ({ user, text, movie }) => {
  return Comment.create({ user, text, movie });
};

const deleteComment = (id) => {
  return Comment.findByIdAndDelete(id);
};

const deleteAllMovieComments = (movieId) => {
  return Comment.deleteMany({ movie: movieId });
};

module.exports = { createComment, deleteComment, deleteAllMovieComments };
