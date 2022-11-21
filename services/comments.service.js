const Comments = require('../models/comments.model');

const createComments = (comment) => {
  return Comments.create(comment);
};

const updateComments = (idComment, comment) => {
  return Comments.findByIdAndUpdate(idComment, comment);
};

const getComments = () => {
  return Comments.find().lean();
};

const deleteComments = (idComment) => {
  return Comments.findByIdAndDelete(idComment).lean();
};
module.exports = {
  createComments,
  updateComments,
  getComments,
  deleteComments,
};
