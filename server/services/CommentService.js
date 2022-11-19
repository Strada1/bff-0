const Comment = require('../models/Comment');

class CommentService {
  createComment({ movieId, author, text }) {
    return Comment.create({ movie: movieId, author, text });
  }

  getComments(movieId) {
    return Comment.find({ movie: movieId });
  }

  getComment(id) {
    return Comment.findById(id);
  }

  updateComment(id, { text, author }) {
    return Comment.findByIdAndUpdate(id, { text, author }, {
      new: true,
    });
  }

  deleteComment(id) {
    return Comment.findByIdAndDelete(id);
  }

  async deleteAllCommentByIdFilm(id) {
    const { deletedCount } = await Comment.deleteMany({ movie: id });
    return deletedCount;
  }
}

module.exports = new CommentService();
