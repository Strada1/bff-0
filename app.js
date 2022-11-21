require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors')
const port = process.env.PORT
const url = process.env.MONGO_CONNECTION_STRING
const mongoose = require('mongoose');

const moviesRoutes = require('./routes/movies.route');
const categoryRoutes = require('./routes/categories.route');
const directorRoutes = require('./routes/directors.route')
const commentsRoutes = require('./routes/comments.route')

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());

app.use('/movies', moviesRoutes);
app.use('/categories', categoryRoutes);
app.use('/directors', directorRoutes);
app.use('/comments', commentsRoutes);

const allowedOrigins = [''];

app.use(
  cors({
    origin: allowedOrigins,
      methods: "GET,PUT,POST,DELETE"
  })
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
