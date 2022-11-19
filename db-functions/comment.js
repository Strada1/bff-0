const Comment = require('../models/comment');

module.exports.createComment = function (comment) {
  return Comment.create(comment);
};

module.exports.getComment = function (commentId) {
  return Comment.findById(commentId);
};

module.exports.updateComment = function (commentId, reqBody) {
  return Comment.findByIdAndUpdate(commentId, reqBody);
};

module.exports.deleteComment = function (commentId, reqBody) {
  return Comment.findByIdAndDelete(commentId, reqBody);
};
