const express = require('express');
const app = express();
const port = 3001;

const moviesRoutes = require('./routes/movies.route');
const categoryRoutes = require('./routes/categories.route');

const url = 'mongodb://localhost:27017/main';
const mongoose = require('mongoose');
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());

app.use('/movies', moviesRoutes);
app.use('/categories', categoryRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
