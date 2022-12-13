const DB_URL = process.env.MONGO_URL;
const mongoose = require('mongoose');

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log('database connected');

module.exports = mongoose;
