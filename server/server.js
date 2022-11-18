const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/stradaDev";
const movies = require("../routes/movie");
const categories = require("../routes/category");
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const allowedOrigins = [
  "http://localhost:8080",
];

app.use(express.json());

app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.use("/movies", movies);
app.use("/categories", categories);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;