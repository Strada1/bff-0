const Comment = require('../models/Comment');

function createComment({ movie, author, text }) {
  return Comment.create({ movie, author, text });
}

function getComments(movieId) {
  return Comment.find({ movie: movieId });
}

function getComment(id) {
  return Comment.findById(id);
}

function updateComment(commentId, updatedFieldsComment) {
  return Comment.findByIdAndUpdate(commentId, updatedFieldsComment, {
    new: true,
  });
}

function deleteComment(id) {
  return Comment.findByIdAndDelete(id);
}

async function deleteAllCommentByIdFilm(movieId) {
  const { deletedCount } = await Comment.deleteMany({ movie: movieId });
  return deletedCount;
}

module.exports = {
  createComment,
  getComments,
  getComment,
  updateComment,
  deleteComment,
  deleteAllCommentByIdFilm,
};
