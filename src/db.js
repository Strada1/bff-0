const { DB_URL } = require('./utils');
const mongoose = require('mongoose');

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = { mongoose };
