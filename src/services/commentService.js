const Comment = require('../models/Comment');
const { addComment, removeComment } = require('./movieService');

const getComment = (commentId) => {
  return Comment.find({ _id: commentId });
};

const getComments = (movieId) => {
  return Comment.find({ movie: movieId });
};

const createComment = async ({ text, movieId }) => {
  const comment = await Comment.create({
    text,
    movie: movieId,
  });

  await addComment(movieId, comment._id);

  return comment;
};

const updateComment = (commentId, data) => {
  return Comment.findByIdAndUpdate(commentId, data, {
    new: true,
  });
};

const deleteComment = async (commentId) => {
  const comment = await Comment.findByIdAndDelete(commentId);
  await removeComment(comment.movie, commentId);

  return comment;
};

module.exports.getComment = getComment;
module.exports.getComments = getComments;
module.exports.createComment = createComment;
module.exports.updateComment = updateComment;
module.exports.deleteComment = deleteComment;
