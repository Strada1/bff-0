const Comment = require('../models/Comment');

const getComments = (movieId) => {
  return Comment.find({ movie: movieId });
};

const createComment = ({ text, movie }) => {
  return Comment.create({
    text,
    movie,
  });
};

const updateComment = (id, data) => {
  return Comment.findByIdAndUpdate(id, data, {
    new: true,
  });
};

const deleteComment = (id) => {
  return Comment.findByIdAndDelete(id);
};

module.exports.getComments = getComments;
module.exports.createComment = createComment;
module.exports.updateComment = updateComment;
module.exports.deleteComment = deleteComment;
