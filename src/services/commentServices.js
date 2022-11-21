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

const getComments = () => {
  return Comment.find().lean();
};

const getComment = (id) => {
  return Comment.findById(id).lean();
};

const getCommentsByMovie = (movieId) => {
  return Comment.find({ movie: movieId }).lean();
};

const updateComment = (id, { user, text, movie }) => {
  return Comment.findByIdAndUpdate(id, {
    user,
    text,
    movie,
    updatedAt: Date.now(),
  });
};

module.exports = {
  createComment,
  deleteComment,
  deleteAllMovieComments,
  getComments,
  getComment,
  getCommentsByMovie,
  updateComment,
};
