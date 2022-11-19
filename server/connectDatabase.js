const mongoose = require('mongoose');

const URL = process.env.MONGO_CONNECTION_STRING;

mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Database error', err));
