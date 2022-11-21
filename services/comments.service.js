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

const deleteCommentsByMovie = (idMovie) => {
  return Comments.deleteMany({
    idMovie: idMovie,
  }).lean();
};

const createCommentByMovie = (idMovie, comment) => {
  return Comments.create({
    idMovie: idMovie,
    description: comment,
  });
};

const getCommentsByMovie = (idMovie) => {
  return Comments.find({ idMovie: idMovie });
};
module.exports = {
  createComments,
  updateComments,
  getComments,
  deleteComments,
  deleteCommentsByMovie,
  createCommentByMovie,
  getCommentsByMovie,
};
