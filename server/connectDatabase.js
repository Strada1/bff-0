const mongoose = require('mongoose');

const URL = 'mongodb://localhost:27017/main';

mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Database error', err));
