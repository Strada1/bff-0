const mongoose = require('mongoose');

const URL = process.env.MONGO_CONNECTION_STRING;

module.exports.connect = function () {
 mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Database error', err));
}