const router = require('express').Router();

const { Movie, Category, Comment } = require('../models/');
const { getGeneratedResponse } = require('../utils/');

router.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();

    return res.status(200).send(
      getGeneratedResponse(true, movies)
    );
  } catch (err) {
    console.log('Error: ', err.message);
    return res.status(500).send(err.message);
  }
});

router.post('/movies', async (req, res) => {
  try {
    const movie = await Movie.create(req.body);

    return res.status(201).send(
      getGeneratedResponse(true, movie)
    );
  } catch (err) {
    console.log('Error: ', err.message);
    return res.status(500).send(err.message);
  }
});

router.delete('/movies/:movieId', async (req, res) => {
  try {
    const { movieId } = req.params;
    const result = await Movie.findByIdAndDelete(movieId);

    if (!result) {
      return res.status(404).send(
        getGeneratedResponse(false, result, {
          message: 'No document for this id'
        })
      );
    }

    return res.status(200).send(
      getGeneratedResponse(true, result)
    );
  } catch (err) {
    console.log('Error: ', err.message);
    return res.status(500).send(err.message);
  }
});

router.put('/movies/:movieId', async (req, res) => {
  try {
    const { movieId } = req.params;
    const update = req.body;

    const movie = await Movie.findByIdAndUpdate(movieId, update, {
      new: true,
    });

    if (!movie) {
      return res.status(404).send(
        getGeneratedResponse(false, movie, {
          message: 'No document for this id',
        })
      );
    }

    return res.status(200).send(
      getGeneratedResponse(true, movie)
    );
  } catch (err) {
    console.log('Error: ', err.message);
    return res.status(500).send(err.message);
  }
});

router.post('/categories', async (req, res) => {
  try {
    const category = await Category.create(req.body);

    return res.status(201).send(
      getGeneratedResponse(true, category)
    );
  } catch (err) {
    console.log('Error: ', err.message);
    return res.status(500).send(err.message);
  }
});

router.post('/movies/:movieId/comments', async (req, res) => {
  try {
    const { movieId } = req.params;
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).send(
        getGeneratedResponse(false, movie, {
          message: 'No document for this id'
        })
      );
    }

    const comment = await Comment.create({ movie: movieId, ...req.body });

    const { comments: listCommentsObjectId } = movie;
    listCommentsObjectId.push(comment._id)

    await Movie.findByIdAndUpdate(movieId, { comments: listCommentsObjectId });

    return res.status(201).send(
      getGeneratedResponse(true, comment, { movie })
    );
  } catch (err) {
    console.log('Error: ', err.message);
    return res.status(500).send(err.message);
  }
});

module.exports = router;
