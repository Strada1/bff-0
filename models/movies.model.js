const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema(
  {
    title: String,
    category: String,
    year: Number,
    duration: Number,
    director: String,
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('Movie', MovieSchema); // создаем модель по схеме
