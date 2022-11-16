const { Router } = require('express');
const Movie = require('../models/Movie');
const Comment = require('../models/Comment');
const router = Router();

router.post('/', async (req, res) => {
  try {
    if (!req.body?.movie) {
      return res.status(400).send('please write movie id');
    }
    const movie = await Movie.findById(req.body.movie);
    if (!movie) {
      return res.status(404).send('movie not found');
    }
    const comment = await Comment.create(req.body);
    await movie.updateOne({ comments: [...movie.comments, comment._id] });
    return res.status(201).json(comment);
  } catch (error) {
    return res.status(500).send('Server error: ' + error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    return res.status(200).send('Comment deleted');
  } catch (error) {
    return res
      .status(500)
      .send('failed to delete comment\nerror: ' + error.message);
  }
});

module.exports = router;
