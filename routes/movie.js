const express = require("express");
const router = express.Router();
const CommentModel = require("../scheme/commentScheme");
const {
  createMovie,
  updateMovie,
  findMovie,
  MovieModel,
} = require("../services/movieServices");
const { checkRequiredFields } = require("../middlewares/checkRequireFields");

router.get("/", async (req, res) => {
  try {
    const filmList = await MovieModel.find()
      .populate("category")
      .populate("director");
    return res
      .status(201)
      .send({ message: "Movies film has loaded", data: filmList });
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
  checkRequiredFields(["title", "year"]),
  async (req, res) => {
    try {
      const film = await createMovie(req.body);
      return res
        .status(201)
        .send({ message: "Movie has succesfuly added", data: film });
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  }
);

router.patch("/update/:id", async (req, res) => {
  try {
    const film = await updateMovie(req);
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
