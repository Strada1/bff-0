const Movie = require('../models/Movie');

function createMovie({ title, category, year, duration, director }) {
  return Movie.create({ title, category, year, duration, director });
}

function getMovie(id) {
  return Movie.findById(id);
}

function getMovies(filter) {
  if (filter) {
    return Movie.find(filter);
  }
  return Movie.find();
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

function deleteMovie(id) {
  return Movie.findByIdAndDelete(id);
}

module.exports = {
  createMovie,
  getMovie,
  getMovies,
  updateMovie,
  changeMovieAndSave,
  deleteMovie,
};
