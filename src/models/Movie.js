const db = require('../ext/db');

const MovieSchema = new db.Schema({
  title: String,
  year: Number,
  duration: Number,
  category: { type: 'ObjectId', ref: 'Category' },
  director: { type: 'ObjectId', ref: 'Director' },
});

module.exports = db.model('Movie', MovieSchema);
