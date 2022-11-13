const db = require('../ext/db');

const CategorySchema = new db.Schema({
  category: String,
});

module.exports = db.model('Category', CategorySchema);
