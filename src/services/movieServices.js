const Movie = require('../models/Movie');

const createMovie = ({ title, category, year, duration, director }) => {
  return Movie.create({ title, category, year, duration, director });
};

const deleteMovie = (id) => {
  return Movie.findByIdAndDelete(id);
};

const updateMovie = (id, { title, category, year, duration, director }) => {
  return Movie.findByIdAndUpdate(id, {
    title,
    category,
    year,
    duration,
    director,
  });
};

const getMovie = (id) => {
  return Movie.findById(id).lean().populate('category director comments');
};

const getMovies = () => {
  return Movie.find().lean().populate('category director comments');
};

const addCommentInMovie = (movieId, commentId) => {
  console.log(movieId);
  return Movie.findByIdAndUpdate(movieId, { $push: { comments: commentId } });
};

const deleteCommentFromMovie = (movieId, commentId) => {
  return Movie.findByIdAndUpdate(movieId, { $pull: { comments: commentId } });
};

module.exports = {
  createMovie,
  deleteMovie,
  updateMovie,
  getMovie,
  getMovies,
  addCommentInMovie,
  deleteCommentFromMovie,
};
