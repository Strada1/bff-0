const db = require('../ext/db');

const DirectorSchema = new db.Schema({
  director: String,
});

module.exports = db.model('Director', DirectorSchema);
