const express = require("express");
const router = express.Router();
const CommentModel = require("../scheme/commentScheme");
const {
  createMovie,
  updateMovie,
  findMovie,
  MovieModel,
  getMovies,
} = require("../services/movieService");
const fs = require("node:fs/promises");
const { body, validationResult } = require("express-validator");
const NodeCache = require("node-cache");

const movieCache = new NodeCache({ stdTTL: 3600 });

router.get("/", async (req, res) => {
  try {
    const { year, title, category, rating, sort } = req.query;
    const filters = { year, title, category, rating };

    if (!Object.keys(req.query).length && movieCache.has("movies")) {
      return res.status(200).send({
        message: "Movies film has loaded from cache",
        data: movieCache.get("movies"),
      });
    } else {
      const filmList = await getMovies(filters, sort);
      movieCache.set("movies", filmList);
      return res
        .status(201)
        .send({ message: "Movies film has loaded", data: filmList });
    }
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const filmList = await MovieModel.findById(req.params.id)
      .populate("category")
      .populate("director");
    return res
      .status(201)
      .send({ message: "Movies film has loaded", data: filmList });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

router.post(
  "/add",
  body("title").isString(),
  body("year").isLength({ min: 4 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      movieCache.del("movies");
    }
    const film = await createMovie(req.body);
    return res
      .status(201)
      .send({ message: "Movie has succesfuly added", data: film });
  }
);

router.post("/add_by_file", async (req, res) => {
  const file = await fs.readFile("./routes/test.json", {
    encoding: "utf-8",
  });
  const readFile = await JSON.parse(file).film;
  const film = await createMovie(readFile);
  movieCache.del("movies");
  return res
    .status(201)
    .send({ message: "Movie has succesfuly added", data: film });
});

router.patch("/update/:id", async (req, res) => {
  try {
    const film = await updateMovie(req);
    movieCache.del("movies");
    return res
      .status(201)
      .send({ message: "This movie has updated", data: film });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

router.get("/:id/comments_get", async (req, res) => {
  try {
    const commentsList = await CommentModel.find({ movie: req.params.id });

    return res.status(201).send({ data: commentsList });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

router.post("/:id/comments_add", async (req, res) => {
  try {
    const foundMovie = await findMovie(req.params.id, "findById");
    const comment = await CommentModel.create({
      movie: foundMovie._id,
      ...req.body,
    });
    movieCache.del("movies");
    return res
      .status(201)
      .send({ message: "Comment has been added", data: comment });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

router.patch("/:id/comments_update", async (req, res) => {
  try {
    const comment = await CommentModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    movieCache.del("movies");
    return res
      .status(201)
      .send({ message: "Comment has been updated", data: comment });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

router.delete("/:id/comments_delete", async (req, res) => {
  try {
    const comment = await CommentModel.findByIdAndDelete(req.params.id);
    movieCache.del("movies");
    return res
      .status(201)
      .send({ message: "Comment has been deleted!", data: comment });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const film = await findMovie(req.params.id, "findByIdAndDelete");

    if (film) {
      return res.status(201).send({ message: "Movie has deleted", data: film });
    } else {
      return res.status(401).send({ error: "This Movie is not defined" });
    }
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

module.exports = router;
