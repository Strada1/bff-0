const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL;
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = { mongoose };
