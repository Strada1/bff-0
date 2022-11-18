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

const findAllComments = () => {
  return Comment.find().lean();
};

const findComment = (id) => {
  return Comment.findById(id).lean();
};

const findCommentsByMovie = (movieId) => {
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
  findAllComments,
  findComment,
  findCommentsByMovie,
  updateComment,
};
