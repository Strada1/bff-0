const Director = require('../models/directorModel');

const DIRECTOR = {
  GET: (id, callback) => {
    Director.findById(id, callback);
  },
  UPDATE: (id, update) => {
    return Director.findByIdAndUpdate(id, update);
  },
  DELETE: (id) => {
    return Director.findByIdAndDelete(id);
  },
  CREATE: (directorObject) => {
    return Director.create(directorObject);
  },
};

module.exports = DIRECTOR;
