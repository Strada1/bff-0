const mongoose = require('mongoose');

const DirectorSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  movie: { type: 'ObjectId', ref: 'Movie' },
});

const Director = mongoose.model('Directors', DirectorSchema);

module.exports = Director;
