require('dotenv').config();
const url = process.env.MONGO_CONNECTION_STRING;
const mongoose = require('mongoose');
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoose;