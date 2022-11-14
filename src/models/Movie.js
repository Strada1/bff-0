const db = require('../ext/db');

const MovieSchema = new db.Schema({
  title: String,
  category: { type: 'ObjectId', ref: 'Category' },
  year: Number,
  duration: Number,
  director: String,
});

module.exports = db.model('Movie', MovieSchema);
