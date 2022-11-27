const Movie = require('../models/Movie');
const db = require('../ext/db');

const getMovies = (options) => {
  const query = Movie.find().populate(['category', 'director']);
  const extendedFields = options.extendedFields?.split(',') ?? [];

  if (extendedFields.includes('comments')) {
    query.populate('comments');
  }

  if (options.year) {
    query.where('year', options.year);
  }

  if (options.sort) {
    query.sort({ title: options.sort });
  }

  return query;
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

const addComment = (movieId, commentId) => {
  return Movie.findByIdAndUpdate(
    { _id: movieId },
    { $push: { comments: commentId } }
  );
};

const removeComment = (movieId, commentId) => {
  return Movie.findByIdAndUpdate(
    { _id: movieId },
    { $pull: { comments: commentId } }
  );
};

const aggregateByDirector = async (directorId) => {
  const count = await Movie.aggregate([
    {
      $match: { director: new db.Types.ObjectId(directorId) },
    },
  ]).count('count');

  return count;
};

const aggregateByYears = async ({ from, to }) => {
  const movies = await Movie.aggregate([
    {
      $match: { year: { $gte: from, $lte: to } },
    },
  ]);

  return movies;
};

module.exports.getMovies = getMovies;
module.exports.createMovie = createMovie;
module.exports.updateMovie = updateMovie;
module.exports.deleteMovie = deleteMovie;
module.exports.addComment = addComment;
module.exports.removeComment = removeComment;
