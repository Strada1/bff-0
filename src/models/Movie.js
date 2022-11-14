const { ObjectId } = require('mongodb');
const mongoose = require('../db.js');

const MovieSchema = mongoose.Schema({
  title: String,
  category: { type: ObjectId, ref: 'Category' },
  year: Number,
  duration: Number,
  director: String,
});

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;
