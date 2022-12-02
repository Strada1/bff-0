const express = require("express");
const cors = require("cors");
const { urlServer, port } = require("./src/config");
const connectDB = require("./src/connectDB");
const MovieModel = require("./src/Model/movieModel");
const CategoryModel = require("./src/Model/categoryModel");
const app = express();

app.use(express.json()); // в express есть встроенный модуль

const allowedOrigins = [`http://localhost:${port}`];
app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/movies", async (req, res) => {
  await MovieModel.create(req.body);
  res.send(req.body);
});
app.listen(port, () => {
  console.log(`Localhost port ${port} listen`);
});
