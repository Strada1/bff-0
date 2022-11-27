const Movie = require('../models/Movie');
const NodeCache = require('node-cache');
const moviesCache = new NodeCache();
const moviesCacheKeys = {
  all: 'all',
};

const createMovie = ({ title, category, year, duration, director }) => {
  moviesCache.del(moviesCacheKeys.all);
  return Movie.create({ title, category, year, duration, director });
};

const deleteMovie = (id) => {
  moviesCache.del(moviesCacheKeys.all);
  return Movie.findByIdAndDelete(id);
};

const updateMovie = (id, { title, category, year, duration, director }) => {
  moviesCache.del(moviesCacheKeys.all);
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

const getMovies = ({
  title,
  category,
  year,
  duration,
  director,
  sort,
  asc = 1,
}) => {
  const movies = Movie.find().lean().populate('category director comments');
  if (sort) {
    movies.sort({ [sort]: asc });
  }
  if (title) {
    movies.where('title', new RegExp(title, 'i'));
  }
  if (category) {
    movies.where('category', category);
  }
  if (year) {
    movies
      .where('year')
      .gte(new Date(year))
      .lt(new Date(String(+year + 1)));
  }
  if (duration) {
    movies.where('duration').lte(duration);
  }
  if (director) {
    movies.where('director', director);
  }
  return movies;
};

const addCommentInMovie = (movieId, commentId) => {
  moviesCache.del(moviesCacheKeys.all);
  return Movie.findByIdAndUpdate(movieId, { $push: { comments: commentId } });
};

const deleteCommentFromMovie = (movieId, commentId) => {
  moviesCache.del(moviesCacheKeys.all);
  return Movie.findByIdAndUpdate(movieId, { $pull: { comments: commentId } });
};

const countMoviesBetweenYears = (startedYear, finalYear) => {
  return Movie.aggregate()
    .match({
      year: {
        $gte: new Date(startedYear),
        $lt: new Date(String(+finalYear + 1)),
      },
    })
    .group({ _id: null, count: { $sum: 1 } });
};

module.exports = {
  createMovie,
  deleteMovie,
  updateMovie,
  getMovie,
  getMovies,
  addCommentInMovie,
  deleteCommentFromMovie,
  countMoviesBetweenYears,
  moviesCache,
  moviesCacheKeys,
};
