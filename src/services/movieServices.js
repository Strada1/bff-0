const Movie = require('../models/Movie');

const createMovie = ({ title, category, year, duration, director }) => {
  return Movie.create({ title, category, year, duration, director });
};

const deleteMovie = (id) => {
  return Movie.findByIdAndDelete(id);
};

const upgradeMovie = (id, { title, category, year, duration, director }) => {
  return Movie.findByIdAndUpdate(id, {
    title,
    category,
    year,
    duration,
    director,
  });
};

const findMovie = (id) => {
  return Movie.findById(id).lean().populate('category');
};

const findAllMovies = () => {
  return Movie.find().lean().populate('category');
};

module.exports = {
  createMovie,
  deleteMovie,
  upgradeMovie,
  findMovie,
  findAllMovies,
};
