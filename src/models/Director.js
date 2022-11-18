const mongoose = require('../db.js');

const DirectorSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  birthDay: Date,
});

const Director = mongoose.model('Director', DirectorSchema);

module.exports = Director;
