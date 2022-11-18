const Movie = require('../models/Movie');

function getMovie(id) {
  return Movie.findById(id);
}

function getMovies(filter) {
  if (filter) {
    return Movie.find(filter);
  }
  return Movie.find();
}

function createMovie({ title, category, year, duration, director }) {
  return Movie.create({ title, category, year, duration, director });
}

function deleteMovie(id) {
  return Movie.findByIdAndDelete(id);
}

function updateMovie(id, updatedFieldsMovie) {
  return Movie.findByIdAndUpdate(id, updatedFieldsMovie, {
    new: true,
  });
}

function changeMovieAndSave(movie, callback) {
  callback(movie);
  movie.save();
}

module.exports = {
  getMovie,
  getMovies,
  createMovie,
  deleteMovie,
  updateMovie,
  changeMovieAndSave,
};
