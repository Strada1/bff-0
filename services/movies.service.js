const Movie = require('../models/movies.model');

const createMovie = (movie) => {
  return Movie.create(movie);
};

const updateMovie = (idMovie, movie) => {
  return Movie.findByIdAndUpdate(idMovie, movie);
};

const getMovie = () => {
  return Movie.find().lean();
};

const deleteMovie = (idMovie) => {
  return Movie.findByIdAndDelete(idMovie).lean();
};

module.exports = { createMovie, updateMovie, getMovie, deleteMovie };
