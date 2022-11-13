const db = require('mongoose');
const { DB_URL } = require('../settings');

db.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = db;
