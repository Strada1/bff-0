const Movie = require('../models/movie');

module.exports.createMovie = function (reqBody) {
  return Movie.create(reqBody);
};

module.exports.getMovie = function (movieId) {
  return Movie.findById(movieId).populate('director').populate('category');
};

module.exports.updateMovie = function (movieId, reqBody) {
  return Movie.findByIdAndUpdate(movieId, reqBody);
};

module.exports.deleteMovie = function (movieId) {
  return Movie.findByIdAndDelete(movieId);
};

module.exports.getMovies = function () {
  return Movie.find({}).populate('director').populate('category');
};
