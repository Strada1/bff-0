const mongoose = require('mongoose');
const { DB_URL } = require('./config');

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

module.exports = mongoose;