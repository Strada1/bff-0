const express = require("express");
const { PORT } = require('./config');

const movies = require("./routes/movies");
const categories = require("./routes/categories");

const app = express();

app.use(express.json());

app.use(categories, movies);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
})