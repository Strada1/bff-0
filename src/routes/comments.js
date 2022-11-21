const { Router } = require('express');
const {
  createComment,
  deleteComment,
  getComments,
  getComment,
  getCommentsByMovie,
  updateComment,
} = require('../services/commentServices');
const {
  getMovie,
  deleteCommentFromMovie,
  addCommentInMovie,
} = require('../services/movieServices');
const router = Router();

router.get('/', async (req, res) => {
  try {
    const movieId = req.query.movieId;
    let comments = null;
    if (movieId) {
      comments = await getCommentsByMovie(movieId);
    } else {
      comments = await getComments();
    }
    return res.status(200).json(comments);
  } catch (error) {
    return res
      .status(500)
      .send('failed to get comments\nerror: ' + error.message);
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const comment = await getComment(id);
    if (!comment) {
      return res.status(404).send(`Comment id:${id} - not found`);
    }
    return res.status(200).json(comment);
  } catch (error) {
    return res
      .status(500)
      .send(`failed to get comment ${id}\nerror: ` + error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    if (!req.body?.movie) {
      return res.status(400).send('please write movie id');
    }
    const movie = await getMovie(req.body.movie);
    if (!movie) {
      return res.status(404).send('movie not found');
    }
    const comment = await createComment(req.body);
    await addCommentInMovie(movie._id, comment.id);
    return res.status(201).json(comment);
  } catch (error) {
    return res.status(500).send('Server error: ' + error.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const comment = await updateComment(req.params.id, req.body);

    if (!comment) {
      return res.status(404).send(`Comment id:"${req.params.id}" - Not found`);
    }

    return res.status(200).send('Comment updated successfully');
  } catch (error) {
    return res
      .status(500)
      .send('failed to update comment\nerror: ' + error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const comment = await deleteComment(req.params.id);
    if (!comment) {
      return res.status(404).send(`Comment id:"${req.params.id}" - Not found`);
    }
    await deleteCommentFromMovie(comment.movie, comment.id);
    return res.status(200).send('Comment deleted');
  } catch (error) {
    return res
      .status(500)
      .send('failed to delete comment\nerror: ' + error.message);
  }
});

module.exports = router;
