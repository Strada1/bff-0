const { Router } = require('express');
const { query, body } = require('express-validator');
const passport = require('../middlewares/passport');
const validate = require('../middlewares/validate');
const validateParamId = require('../middlewares/validateParamId');
const {
  validationErrorsHandler,
} = require('../middlewares/validationErrorsHandler');
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
  validationErrorsHandler,
  async (req, res) => {
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
  }
);

router.get(
  '/:id',
  validateParamId(),
  validationErrorsHandler,
  async (req, res) => {
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
  }
);

router.post(
  '/',
  passport.authenticate('bearer', { session: false }),
  validate(['user', 'text', 'movie']),
  validationErrorsHandler,
  async (req, res) => {
    try {
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
  passport.authenticate('bearer', { session: false }),
  body('user', 'Should be string').isString().optional(),
  body('text', 'Should be string').isString().optional(),
  validateParamId(),
  validationErrorsHandler,
  async (req, res) => {
    try {
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

router.delete(
  '/:id',
  passport.authenticate('bearer', { session: false }),
  validateParamId(),
  validationErrorsHandler,
  async (req, res) => {
    try {
      const comment = await deleteComment(req.params.id);
      if (!comment) {
        return res
          .status(404)
          .send(`Comment id:"${req.params.id}" - Not found`);
      }
      await deleteCommentFromMovie(comment.movie, comment.id);
      return res.status(200).send('Comment deleted');
    } catch (error) {
      return res
        .status(500)
        .send('failed to delete comment\nerror: ' + error.message);
    }
  }
);

module.exports = router;
