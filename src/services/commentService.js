const Comment = require('../models/Comment');
const { addComment } = require('./movieService');

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

const updateComment = (id, data) => {
  return Comment.findByIdAndUpdate(id, data, {
    new: true,
  });
};

const deleteComment = (id) => {
  return Comment.findByIdAndDelete(id);
};

module.exports.getComment = getComment;
module.exports.getComments = getComments;
module.exports.createComment = createComment;
module.exports.updateComment = updateComment;
module.exports.deleteComment = deleteComment;
