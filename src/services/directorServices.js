const Director = require('../models/Director');

const createDirector = ({ firstName, lastName, birthDay }) => {
  return Director.create({ firstName, lastName, birthDay });
};
const findAllDirectors = () => {
  return Director.find().lean();
};
const findDirector = (id) => {
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
  findAllDirectors,
  findDirector,
  updateDirector,
  deleteDirector,
};
