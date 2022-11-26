const {
  getDirectorMoviesCount,
  getYearMoviesFind,
} = require("../services/testService");
const express = require("express");
const router = express.Router();

router.get("/:directorId", async (req, res) => {
  try {
    const moviesCount = await getDirectorMoviesCount(req.params.directorId);
    return res.status(200).send(moviesCount);
  } catch (e) {
    console.log(e);
    return res.status(500).send("can not get moviesCount");
  }
});

router.get("/", async (req, res) => {
  try {
    const moviesCount = await getYearMoviesFind(req.body.gt, req.body.lt);
    return res.status(200).send(moviesCount);
  } catch (e) {
    console.log(e);
    return res.status(500).send("can not get moviesCount");
  }
});

module.exports = router;
