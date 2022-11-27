const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const {
  getComment,
  getComments,
  createComment,
  updateComment,
  deleteComment,
} = require('../services/commentService');
const { validate, sanitize } = require('../middlewares');
const { validationResult, body } = require('express-validator');

router.get('/comments/', async (request, response) => {
  try {
    const { movieId } = request.body;

    const comments = await getComments(movieId);

    response.status(200).send(comments);
  } catch (error) {
    console.log(error);
    return response.status(500).send([]);
  }
});

router.get('/comments/:commentId', async (request, response) => {
  try {
    const { commentId } = request.params;

    const comments = await getComment(commentId);

    response.status(200).send(comments);
  } catch (error) {
    console.log(error);
    return response.status(500).send([]);
  }
});

router.post(
  '/comments',
  validate(['text', 'movieId']),
  sanitize(['text', 'movieId']),
  body('movieId').isLength({ min: 24 }),
  async (request, response) => {
    const { errors } = validationResult(request);

    if (errors.length > 0) {
      return response.status(400).send({ errors });
    }

    try {
      const { text, movieId } = request.body;

      const result = await createComment({
        text,
        movieId,
      });

      response.status(201).send(result);
    } catch (error) {
      console.log(error);
      response.status(500).send({});
    }
  }
);

router.put('/comments/:commentId', async (request, response) => {
  try {
    const { commentId } = request.params;
    const comment = await updateComment(commentId, request.body);

    response.status(200).send(comment);
  } catch (error) {
    console.log(error);
    response.status(500).send({});
  }
});

router.delete('/comments/:commentId', async (request, response) => {
  try {
    const { commentId } = request.params;
    const deleted = await deleteComment(commentId);

    response.status(204).send(deleted);
  } catch (error) {
    console.log(error);
    response.status(500).send({});
  }
});

module.exports = router;
