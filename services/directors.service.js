const Director = require('../models/directors.model');

const getDirector = () => {
  return Director.find().lean();
};

const createDirector = (director) => {
  return Director.create(director);
};

const updateDirector = (idDirector, director) => {
  return Director.findByIdAndUpdate(idDirector, director);
};

const deleteDirector = (idDirector) => {
  return Director.findByIdAndDelete(idDirector).lean();
};
module.exports = {
  createDirector,
  updateDirector,
  getDirector,
  deleteDirector,
};
