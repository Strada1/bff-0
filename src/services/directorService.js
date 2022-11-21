const Director = require('../models/Director');

const getDirectors = () => {
  return Director.find();
};

const createDirector = ({ director }) => {
  return Director.create({ director });
};

const updateDirector = (id, data) => {
  return Director.findByIdAndUpdate(id, data, {
    new: true,
  });
};

const deleteDirector = (id) => {
  return Director.findByIdAndDelete(id);
};

const findDirector = (director) => {
  return Director.findOne(director);
};

module.exports.getDirectors = getDirectors;
module.exports.createDirector = createDirector;
module.exports.updateDirector = updateDirector;
module.exports.deleteDirector = deleteDirector;
module.exports.findDirector = findDirector;
