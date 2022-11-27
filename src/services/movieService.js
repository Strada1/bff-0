const Movie = require('../models/Movie');

const getMovies = (options) => {
  const optionalFields = [];

  if (options.withComments) {
    optionalFields.push('comments');
  }

  return Movie.find().populate([
    ...['category', 'director'],
    ...optionalFields,
  ]);
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

module.exports.getMovies = getMovies;
module.exports.createMovie = createMovie;
module.exports.updateMovie = updateMovie;
module.exports.deleteMovie = deleteMovie;
module.exports.addComment = addComment;
module.exports.removeComment = removeComment;
