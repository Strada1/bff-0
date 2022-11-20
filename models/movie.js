const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  duration: Number,
  director: { type: 'ObjectId', ref: 'Directors' },
  category: { type: 'ObjectId', ref: 'Categories' },
  comments: [{ type: 'ObjectId', ref: 'Comments' }],
});

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;
