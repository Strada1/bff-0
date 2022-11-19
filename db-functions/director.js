const Director = require('../models/director');

module.exports.createDirector = function (reqBody) {
  return Director.create(reqBody);
};

module.exports.getDirector = function (directorId) {
  return Director.findById(directorId);
};

module.exports.updateDirector = function (directorId, reqBody) {
  return Director.findByIdAndUpdate(directorId, reqBody);
};

module.exports.deleteDirector = function (directorId) {
  return Director.findByIdAndDelete(directorId);
};
