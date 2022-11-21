const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: String,
  category: { type: 'ObjectId', ref: 'Category' },
  year: Number,
  duration: Number,
  director: { type: 'ObjectId', ref: 'Director' },
});

module.exports = mongoose.model('Movie', MovieSchema); // создаем модель по схеме
