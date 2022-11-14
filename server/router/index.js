const movieModel = require("../models/movie-model");

const Router = require("express").Router;
const router = new Router();

router.post("/movies", (req, res, next) => {
    try {
        movieModel.create(req.body);
        return res.status(201).send("movie created");
    } catch (err) {
        next(err);
    }
});
router.post("/categories", (req, res, next) => {
    try {
        movieModel.create(req.body);
        return res.status(201).send("add categories");
    } catch (err) {
        next(err);
    }
});
router.get("/data", (req, res) => {
    res.json({text: "Hello World!"});
});

module.exports = router;
