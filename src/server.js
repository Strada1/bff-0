const express = require('express');
const app = express();
const cors = require('cors');
const Movies = require('./routes/movies');
const Categories = require('./routes/categories');
const Directors = require('./routes/directors');
require('dotenv').config();

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS,
  }),
  express.json()
);
app.use(Movies, Categories, Directors);

app.listen(process.env.PORT, () => {
  console.log(
    `server running at ${process.env.SERVER_URL}:${process.env.PORT}`
  );
});
