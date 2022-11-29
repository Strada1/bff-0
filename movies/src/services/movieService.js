const Movie = require('../models/Movie');

const getMovies = ({ sort, title, year }) => {
  const query = Movie.find().lean().populate('category director comments');
  if (title) query.where('title', title);
  if (year) query.where('year', year);
  if (sort) query.sort(sort);
  return query.exec();
};
const getMovie = (movieId) => {
  return Movie.findById({ _id: movieId }).populate('category director comments');
};

const createMovie = ({ title, year, duration, category, director, comments }) => {
  return Movie.create({ title, year, duration, category, director, comments });
};

const deleteMovie = (movieId) => {
  return Movie.findByIdAndDelete({ _id: movieId }).lean();
};

const updateMovie = (movieId, data) => {
  return Movie.findByIdAndUpdate({ _id: movieId }, data, { new: true }).lean();
};

const addCommentToMovie = (movieId, commentId) => {
  console.log(movieId, commentId);
  return Movie.findByIdAndUpdate(movieId, { $push: { comments: commentId } }).lean();
};

const deleteCommentFromMovie = (movieId, commentId) => {
  console.log(movieId, commentId);
  return Movie.findByIdAndUpdate(movieId, { $pull: { comments: commentId } }).lean();
};

module.exports = {
  getMovies,
  getMovie,
  createMovie,
  deleteMovie,
  updateMovie,
  addCommentToMovie,
  deleteCommentFromMovie
};
