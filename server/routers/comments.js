import { Router } from 'express';
import ApiError from '../exceptions/apiError.js';

import {
  createComment,
  getComment,
  getComments,
  updateComment,
  deleteComment,
  addComment,
  pullComment,
} from '../services/comment.js';

const router = new Router();

router.post('/', async (req, res, next) => {
  try {
    const { author, text } = req.body;
    const { movieId } = req.query;

    const comment = await createComment({ author, text, movie: movieId });
    await addComment(comment._id, movieId);

    return res.status(201).send(comment);
  } catch (err) {
    next(err);
  }
});

router.get('/:commentId', async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const comment = await getComment(commentId);

    if (!comment) {
      return next( ApiError.NotFound('No comment for this ID') );
    }

    return res.status(200).send(comment);
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const { movieId } = req.query;
    const comments = await getComments(movieId);

    return res.status(200).send(comments);
  } catch (err) {
    next(err);
  }
});

router.put('/:commentId', async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { author, text } = req.body;
    const updatedComment = await updateComment(commentId, { author, text });

    if (!updatedComment) {
      return next( ApiError.NotFound('No comment for this ID') );
    }

    return res.status(200).send(updatedComment);
  } catch (err) {
    next(err);
  }
});

router.delete('/:commentId', async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const deletedComment = await deleteComment(commentId);

    if (!deletedComment) {
      return next( ApiError.NotFound('No comment for this ID') );
    }

    await pullComment(commentId, deletedComment.movie);

    return res.status(200).send(deletedComment);
  } catch (err) {
    next(err);
  }
});

export default router;