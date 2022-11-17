const Comment = require('../models/Comment');

class CommentService {
  async createComment({ movieId, author, text }) {
    return Comment.create({ movie: movieId, author, text });
  }

  async deleteAllCommentByIdFilm(id) {
    const { deletedCount } = await Comment.deleteMany({ movie: id });
    return deletedCount;
  }
}

module.exports = new CommentService();
