const { ObjectId } = require('mongodb');
const Director = require('../models/Director');
const Movie = require('../models/Movie');

const createDirector = ({ firstName, lastName, birthDay }) => {
  return Director.create({ firstName, lastName, birthDay });
};
const getDirectors = () => {
  return Director.find().lean();
};
const getDirector = (id) => {
  return Director.findById(id);
};
const updateDirector = (id, { firstName, lastName, birthDay }) => {
  return Director.findByIdAndUpdate(id, { firstName, lastName, birthDay });
};
const deleteDirector = (id) => {
  return Director.findByIdAndDelete(id);
};

const countMoviesByDirector = (directorId) => {
  return Movie.aggregate()
    .match({ director: new ObjectId(directorId) })
    .group({ _id: directorId, moviesCount: { $sum: 1 } });
};

module.exports = {
  createDirector,
  getDirectors,
  getDirector,
  updateDirector,
  deleteDirector,
  countMoviesByDirector,
};
