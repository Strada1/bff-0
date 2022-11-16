const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: String,
  category: { type: 'ObjectId', ref: 'Category' },
  year: Number,
  duration: Number,
  director: String,
  rating: Number,
});

module.exports = mongoose.model('Movie', MovieSchema);
