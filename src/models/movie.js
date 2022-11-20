const { mongoose } = require('../db');
const { ObjectId } = require('mongodb');

const MovieSchema = new mongoose.Schema({
  title: String,
  category: { type: ObjectId, ref: 'Category' },
  year: Number,
  duration: Number,
  director: { type: ObjectId, ref: 'Director' },
  comments: [ { type: ObjectId, ref: 'Comment' } ],
});

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = { Movie };
