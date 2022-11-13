const db = require('../ext/db');

const MovieSchema = new db.Schema({
  title: String,
  category: String,
  year: Number,
  duration: Number,
  director: String,
});

module.exports = db.model('Movie', MovieSchema);
