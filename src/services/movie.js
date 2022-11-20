const { Movie, Comment } = require('../models');

class Service {
  create = ( { title, category, year, duration, director } ) => {
    return Movie.create({ title, category, year, duration, director });
  };
  get = () => {
    return Movie.find().populate('comments');
  };
  getOne = ( movieId ) => {
    return Movie.findById(movieId).populate('comments');
  };
  update = ( movieId, { title, category, year, duration, director } ) => {
    return Movie.findByIdAndUpdate(
      movieId,
      { title, category, year, duration, director },
      { new: true },
    );
  };
  delete = ( movieId ) => {
    return Movie.findByIdAndDelete(movieId);
  };
  addComment = async ( movieId, { text } ) => {
    const comment = await Comment.create({ movie: movieId, text });
    return Movie.findByIdAndUpdate(
      movieId,
      { $push: { comments: comment._id } },
      { new: true },
    );
  };
  updateComment = ( commentId, { text } ) => {
    return Comment.findByIdAndUpdate(
      commentId,
      { text },
    );
  };
  deleteComment = async ( movieId, commentId ) => {
    const comment = await Comment.findByIdAndDelete(commentId);
    return Movie.findByIdAndUpdate(
      movieId,
      { $pull: { comments: comment._id } },
      { new: true },
    );
  };
}

const movieService = new Service();

module.exports = { movieService };
