const { Movie } = require('../models');

class Service {
  create = ( { title, category, year, duration, director } ) => {
    return Movie.create({ title, category, year, duration, director });
  };
  get = ( movieId ) => {
    return Movie.findById(movieId);
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
  addComment = ( movieId, { text } ) => {
    return Movie.findByIdAndUpdate(
      movieId,
      { $push: { comments: { text } } },
      { new: true },
    );
  };
  deleteComment = ( movieId, commentId ) => {
    return Movie.findByIdAndUpdate(
      movieId,
      { $pull: { comments: { _id: commentId } } },
      { new: true },
    );
  };
}

const movieService = new Service();

module.exports = { movieService };
