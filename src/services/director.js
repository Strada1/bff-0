const { Director } = require('../models');

class Service {
  create = ( { name, surname, age } ) => {
    return Director.create({ name, surname, age });
  };
  get = () => {
    return Director.find();
  };
  getOne = ( directorId ) => {
    return Director.findById(directorId);
  };
  update = ( directorId, { name, surname, age } ) => {
    return Director.findByIdAndUpdate(
      directorId,
      { name, surname, age },
    );
  };
  delete = ( directorId ) => {
    return Director.findByIdAndDelete(directorId);
  };
}

const directorService = new Service();

module.exports = { directorService };
