const express = require('express');
const cors = require('cors');
const { connectDataBase } = require('./database');
const category = require('./routes/category');
const movies = require('./routes/movies');
const director = require('./routes/movieDirector');
const allowedOrigins = ['https://strada.one', 'http://localhost:3000'];

const app = express();
const port = 3000;

app.use(express.json());
app.use('/movies', movies);
app.use('/category', category);
app.use('/director', director);
app.use(
  cors({
    origin: allowedOrigins,
  })
);

connectDataBase();

app.listen(port, () => {
  console.log(`server start on port: ${port}`);
});

module.exports.app = app;
