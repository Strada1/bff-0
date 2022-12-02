const { Router } = require('express');
const { validationResult, query, body } = require('express-validator');
const { checkAuth } = require('../middlewares/checkAuth');
const validate = require('../middlewares/validate');
const validateParamId = require('../middlewares/validateParamId');
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

router.get(
  '/',
  query('movieId', 'movieId should be ObjectId').isMongoId().optional(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
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
  }
);

router.get('/:id', validateParamId(), async (req, res) => {
  const id = req.params.id;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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

router.post(
  '/',
  validate(['user', 'text', 'movie']),
  checkAuth,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
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
  }
);

router.put(
  '/:id',
  body('user', 'Should be string').isString().optional(),
  body('text', 'Should be string').isString().optional(),
  checkAuth,
  validateParamId(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const comment = await updateComment(req.params.id, req.body);

      if (!comment) {
        return res
          .status(404)
          .send(`Comment id:"${req.params.id}" - Not found`);
      }

      return res.status(200).send('Comment updated successfully');
    } catch (error) {
      return res
        .status(500)
        .send('failed to update comment\nerror: ' + error.message);
    }
  }
);

router.delete('/:id', validateParamId(), checkAuth, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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
