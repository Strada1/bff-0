const Director = require('../models/Director');

const getDirectors = () => {
  return Director.find().lean().populate('movies');
};

const getDirector = (directorId) => {
  return Director.findById({ _id: directorId }).lean().populate('movies');
};

const createDirector = ({ fullName, birthday, movies }) => {
  return Director.create({ fullName, birthday: new Date(birthday), movies });
};

const updateDirector = (directorId, data) => {
  if (data.birthday) data.birthday = new Date(data.birthday);
  return Director.findByIdAndUpdate({ _id: directorId }, data, {
    new: true,
  }).lean();
};

const deleteDirector = (directorId) => {
  return Director.findByIdAndDelete({ _id: directorId }).lean();
};

module.exports = {
  getDirectors,
  getDirector,
  createDirector,
  updateDirector,
  deleteDirector,
};
