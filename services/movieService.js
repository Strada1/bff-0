const Movie = require('../models/movie.js');

const createMovie = ({ title, year, director, duration, category }) => {
  return Movie.create({ title, year, director, duration, category });
};

const showAllMovies = () => {
  return Movie.find({}).lean().populate('category director');
};

const updateMovie = (_id, { title, year, director, duration, category }) => {
  return Movie.findByIdAndUpdate(
    _id,
    { title, year, director, duration, category },
    {
      new: true,
    }
  );
};

const deliteMovie = ({ _id }) => {
  return Movie.findByIdAndDelete({ _id });
};

module.exports = { createMovie, deliteMovie, updateMovie, showAllMovies };
