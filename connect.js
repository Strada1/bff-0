const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/main';

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: false,
});
