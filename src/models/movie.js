const { Schema, model } = require('../db');

const MovieSchema = new Schema({
  title: String,
  year: Number,
  rating: Number,
  category: { type: 'ObjectId', ref: 'Category' }
})

const Movie = model('Movie', MovieSchema, 'movies'); // movies тут не обязателен, mongoose к Movie сам добавит s в конце

module.exports = Movie;
