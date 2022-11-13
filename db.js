const DB_URL = 'mongodb://localhost:27017/main';
const mongoose = require('mongoose');
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log('database connected');
module.exports = mongoose;
