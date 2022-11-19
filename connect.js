require('dotenv').config();

const mongoose = require('mongoose');

const url = process.env.MONGO_CONNECTION_STRING;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: false,
});
