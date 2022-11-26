require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT;
const mongoose = require("mongoose");
const url = process.env.BASE_URL;
const movies = require("../routes/movie");
const categories = require("../routes/category");
const directors = require("../routes/director");
const test = require("../test/routes/test");
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const allowedOrigins = ["http://localhost:8080"];

app.use(express.json());

app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.use("/movies", movies);
app.use("/categories", categories);
app.use("/directors", directors);
app.use("/test", test);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
