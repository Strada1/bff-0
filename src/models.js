const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  // определяем схему
  title: String,
  direction: String,
  year: Number,
  rating: Number,
  duration: Number,
});

const CatigorySchema = new mongoose.Schema({ title: String });

const Movie = mongoose.model('Movie', MovieSchema); // создаем модель по схеме
const Catigory = mongoose.model('Catigory', CatigorySchema);

module.exports.Movie = Movie;
module.exports.Catigory = Catigory;
