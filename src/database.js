const models = require('./models');
const { Catigory, Movie } = models;
const url = 'mongodb://127.0.0.1:27017/main'; // указываем имя нужной базы
const mongoose = require('mongoose');
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const category = Catigory.create({ title: 'action' });
const movie = Movie.create({
  title: 'Matrix',
  direction: 'Vachovsky',
  year: 1999,
  rating: 8.7,
  duration: 180,
});
