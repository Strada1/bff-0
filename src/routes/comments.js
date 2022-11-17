const { Router } = require('express');
const { createComment, deleteComment } = require('../services/commentServices');
const { findMovie } = require('../services/movieServices');
const router = Router();

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
