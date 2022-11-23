import * as CommentService from '../services/comment.js';

export async function createComment(req, res) {
  try {
    const { author, text } = req.body;
    const { movieId } = req.query;

    const comment = await CommentService.createComment({ author, text, movie: movieId });
    await CommentService.addComment(comment._id, movieId);

    return res.status(201).send(comment);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function getComment(req, res) {
  try {
    const { commentId } = req.params;
    const comment = await CommentService.getComment(commentId);

    if (!comment) {
      return res.status(404).send('No comment for this ID');
    }

    return res.status(200).send(comment);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function getComments(req, res) {
  try {
    const { movieId } = req.query;
    const comments = await CommentService.getComments(movieId);

    return res.status(200).send(comments);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function updateComment(req, res) {
  try {
    const { commentId } = req.params;
    const { author, text } = req.body;
    const updatedComment = await CommentService.updateComment(commentId, { author, text });

    if (!updatedComment) {
      return res.status(404).send('No comment for this ID');
    }

    return res.status(200).send(updatedComment);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function deleteComment(req, res) {
  try {
    const { commentId } = req.params;
    const deletedComment = await CommentService.deleteComment(commentId);

    if (!deletedComment) {
      return res.status(404).send('No comment for this ID');
    }

    await CommentService.pullComment(commentId, deletedComment.movie);

    return res.status(200).send(deletedComment);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}