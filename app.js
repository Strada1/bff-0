const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000;
const url = 'mongodb://localhost:27017/main';

const movies = require('./routes/movies.js');
const categories = require('./routes/categories.js');
const comments = require('./routes/comments.js');
const directors = require('./routes/directors.js');

const allowedOrigins = ['localhost:3000'];

app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.use('/movies', movies);
app.use('/categories', categories);
app.use('/comments', comments);
app.use('/directors', directors);

function App() {
  try {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (e) {
    console.log(e.message);
  }
}

App();
