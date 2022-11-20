const Director = require('../models/director.js');

const createDirector = ({ firstName, lastName }) => {
  return Director.create({ firstName, lastName });
};

const showAllDirectors = () => {
  return Director.find({}).lean();
};

const updateDirectors = (_id, { firstName, lastName }) => {
  return Director.findByIdAndUpdate(
    _id,
    { firstName, lastName },
    {
      new: true,
    }
  );
};

const deliteDirector = ({ _id }) => {
  return Director.findByIdAndDelete({ _id });
};

module.exports = {
  showAllDirectors,
  createDirector,
  updateDirectors,
  deliteDirector,
};
