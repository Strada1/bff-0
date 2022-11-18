const Comment = require('../models/Comment');

function createComment({ movieId, author, text }) {
  return Comment.create({ movie: movieId, author, text });
}

async function deleteAllCommentByIdFilm(id) {
  const { deletedCount } = await Comment.deleteMany({ movie: id });
  return deletedCount;
}

module.exports = {
  createComment,
  deleteAllCommentByIdFilm,
};
