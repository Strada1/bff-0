const { mongoose } = require('../db');
const { ObjectId } = require('mongodb');

const MovieSchema = new mongoose.Schema({
  title: String,
  category: { type: ObjectId, ref: 'Category' },
  year: Number,
  duration: Number,
  director: String,
  comments: [ { text: String } ],
});

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = { Movie };
