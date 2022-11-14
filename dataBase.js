const url = 'mongodb://localhost:27017/main';
const mongoose = require('mongoose');
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

const MovieSchema = new mongoose.Schema({
  title: String,
  category: String,
  year: Number,
  duration: String,
  director: String,
});
const Movie = mongoose.model('Movie', MovieSchema);

const movie = Movie.create({title: 'Matrix', year: 1999});

const CategorySchema = new mongoose.Schema({
  title: String,
});

const Category = mongoose.model('Category', CategorySchema);

const category = Category.create({title: 'Fantastic'})

module.exports = {Category, Movie}