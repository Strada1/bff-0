const express = require("express");
const router = express.Router();
const {
  createMovie,
  updateMovie,
  findMovie,
  MovieModel
} = require("../services/movieServices");
const { createComment } = require("../services/commentService");

router.get("/", async (req, res) => {
  try {
    const filmList = await MovieModel.find();
    return res
      .status(201)
      .send({ message: "Movies film has loaded", data: filmList });
  } catch (err) {}
});

router.post("/add", async (req, res) => {
  try {
    const film = await createMovie(req.body);
    console.log(film);
    return res
      .status(201)
      .send({ message: "Movie has succesfuly added", data: film });
  } catch (err) {}
});

router.put("/update/:id", async (req, res) => {
  try {
    const film = await updateMovie(req);
    return res
      .status(201)
      .send({ message: "This movie has updated", data: film });
  } catch (err) {}
});

router.post("/:id/comments_add", async (req, res) => {
  try {
    const foundMovie = await findMovie(req.params.id, "findById");
    const comment = await createComment(req, foundMovie._id);
    return res
      .status(201)
      .send({ message: "Comment has been added", data: comment });
  } catch (err) {}
});

router.get("/:id/comments_get", async (req, res) => {
  try {
    const commentsList = await CommentModel.find({ movie: req.params.id });

    return res.status(201).send({ data: commentsList });
  } catch (err) {}
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const film = await findMovie(req.params.id, 'findByIdAndDelete');

    if (film) {
      return res.status(201).send({ message: "Movie has deleted", data: film });
    } else {
      return res.status(401).send({ error: "This Movie is not defined" });
    }
  } catch (err) {}
});

module.exports = router;
