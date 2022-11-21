const db = require('mongoose');
require('dotenv').config();

db.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = db;
