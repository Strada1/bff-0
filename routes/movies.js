const express = require("express");
const router = express.Router();
const Movie = require("../models/movies");
router.post("/", async (req, res) => {
  try {
    await Movie.create(req.body);
    return res.status(201).send("movie created");
  } catch (error) {
    console.log(error);
    return res.status(400).send("movie isn't create");
  }
});

module.exports = router;
