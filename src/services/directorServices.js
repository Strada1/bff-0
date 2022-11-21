const Director = require('../models/Director');

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

module.exports = {
  createDirector,
  getDirectors,
  getDirector,
  updateDirector,
  deleteDirector,
};
