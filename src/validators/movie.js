const { mongoIdValidator, validate } = require('../utils/middlewares/validate');

const getMoviesValidator = validate({
  'filters.category': {
    optional: {},
    isMongoId: { errorMessage: 'Category filter should be a mongoId' },
  },
  'filters.year': {
    optional: {},
    isNumeric: { errorMessage: 'Year filter should be a number' },
  },
  'filters.director': {
    optional: {},
    isMongoId: { errorMessage: 'Director filter should be a mongoId' },
  },
  'sort.title': {
    optional: {},
    matches: {
      options: [ /\b(?:asc|desc|ascending|descending|1|-1)\b/ ],
      errorMessage: 'Invalid sort order',
    },
  },
  'sort.category': {
    optional: {},
    matches: {
      options: [ /\b(?:asc|desc|ascending|descending|1|-1)\b/ ],
      errorMessage: 'Invalid sort order',
    },
  },
  'sort.year': {
    optional: {},
    matches: {
      options: [ /\b(?:asc|desc|ascending|descending|1|-1)\b/ ],
      errorMessage: 'Invalid sort order',
    },
  },
  'sort.director': {
    optional: {},
    matches: {
      options: [ /\b(?:asc|desc|ascending|descending|1|-1)\b/ ],
      errorMessage: 'Invalid sort order',
    },
  },
});

const createMovieValidator = validate({
  title: {
    exists: { errorMessage: 'Title is required' },
    isString: { errorMessage: 'Title should be a string' },
  },
  category: {
    exists: { errorMessage: 'Category is required' },
    isMongoId: { errorMessage: 'Category should be a mongoId' },
  },
  year: {
    exists: { errorMessage: 'Year is required' },
    isNumeric: { errorMessage: 'Year should be a number' },
  },
  duration: {
    exists: { errorMessage: 'Duration is required' },
    isNumeric: { errorMessage: 'Duration should be a number' },
  },
  director: {
    exists: { errorMessage: 'Director is required' },
    isMongoId: { errorMessage: 'Director should be a mongoId' },
  },
});

const movieIdValidator = validate({
  movieId: mongoIdValidator('movieId'),
});

const updateMovieValidator = validate({
  movieId: mongoIdValidator('movieId'),
  title: {
    optional: {},
    isString: { errorMessage: 'Title should be a string' },
  },
  category: {
    optional: {},
    isMongoId: { errorMessage: 'Category should be a mongoId' },
  },
  year: {
    optional: {},
    isNumeric: { errorMessage: 'Year should be a number' },
  },
  duration: {
    optional: {},
    isNumeric: { errorMessage: 'Duration should be a number' },
  },
  director: {
    optional: {},
    isMongoId: { errorMessage: 'Director should be a mongoId' },
  },
});

const createCommentValidator = validate({
  movieId: mongoIdValidator('movieId'),
  text: {
    exists: { errorMessage: 'Title is required' },
    isString: { errorMessage: 'Text should be a string' },
  },
  movie: {
    exists: { errorMessage: 'Movie is required' },
    isMongoId: { errorMessage: 'Movie should be a mongoId' },
  },
});

const commentIdValidator = validate({
  commentId: mongoIdValidator('commentId'),
});

const updateCommentValidator = validate({
  commentId: mongoIdValidator('commentId'),
  text: {
    optional: {},
    isString: { errorMessage: 'Text should be a string' },
  },
});

module.exports = {
  getMoviesValidator,
  createMovieValidator,
  movieIdValidator,
  updateMovieValidator,
  createCommentValidator,
  commentIdValidator,
  updateCommentValidator,
};
