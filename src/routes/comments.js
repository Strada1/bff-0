const { Router } = require('express');
const {
  createComment,
  deleteComment,
  findAllComments,
  findComment,
  findCommentsByMovie,
  updateComment,
} = require('../services/commentServices');
const { findMovie } = require('../services/movieServices');
const router = Router();

router.get('/all', async (req, res) => {
  try {
    const comments = await findAllComments();
    return res.status(200).json(comments);
  } catch (error) {
    return res
      .status(500)
      .send('failed to find comments\nerror: ' + error.message);
  }
});

router.get('/all/:movieId', async (req, res) => {
  try {
    const comments = await findCommentsByMovie(req.params.movieId);
    return res.status(200).json(comments);
  } catch (error) {
    return res
      .status(500)
      .send('failed to find comments\nerror: ' + error.message);
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const comment = await findComment(id);
    if (!comment) {
      return res.status(404).send(`Comment id:${id} - not found`);
    }
    return res.status(200).json(comment);
  } catch (error) {
    return res
      .status(500)
      .send(`failed to find comment ${id}\nerror: ` + error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    if (!req.body?.movie) {
      return res.status(400).send('please write movie id');
    }
    const movie = await findMovie(req.body.movie);
    if (!movie) {
      return res.status(404).send('movie not found');
    }
    const comment = await createComment(req.body);
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
    await deleteComment(req.params.id);
    return res.status(200).send('Comment deleted');
  } catch (error) {
    return res
      .status(500)
      .send('failed to delete comment\nerror: ' + error.message);
  }
});

module.exports = router;
