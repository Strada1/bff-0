const Movie = require('../models/Movie');

const getMovies = () => {
  return Movie.find();
};

const createMovie = ({ title, year, duration, category, director }) => {
  return Movie.create({ title, year, duration, category, director });
};

const updateMovie = (id, data) => {
  return Movie.findByIdAndUpdate(id, data, {
    new: true,
  });
};

const deleteMovie = (id) => {
  return Movie.findByIdAndDelete(id);
};

module.exports.getMovies = getMovies;
module.exports.createMovie = createMovie;
module.exports.updateMovie = updateMovie;
module.exports.deleteMovie = deleteMovie;
