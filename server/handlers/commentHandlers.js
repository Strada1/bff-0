const { getMovie, changeMovieAndSave } = require('../services/movieServices');
const {
  createComment,
  getComments,
  getComment,
  updateComment,
  deleteComment,
  deleteAllCommentByIdFilm,
} = require('../services/commentServices');
const { getGeneratedResponse } = require('../utils');

async function createCommentHandler(req, res) {
  try {
    const { movieId } = req.params;
    const movie = await getMovie(movieId);

    if (!movie) {
      return res.status(404).send(getGeneratedResponse(false, movie, {
        message: 'No document for this id'
      }));
    }

    const comment = await createComment(req.body);

    await changeMovieAndSave(movie, () => {
      movie.comments.push(comment._id);
    });

    return res.status(201).send(
      getGeneratedResponse(true, comment, { movie })
    );
  } catch (err) {
    console.log('Error: ', err.message);
    return res.status(500).send(err.message);
  }
}

async function getCommentsHandler(req, res) {
  try {
      const { movieId } = req.params;
      const movie = await getMovie(movieId);

      if (!movie) {
        return res.status(404).send(getGeneratedResponse(false, movie, {
          message: 'No document for this id'
        }));
      }

      const comments = await getComments(movieId);
      console.log(comments);

      return res.status(200).send(getGeneratedResponse(true, comments));
  } catch (err) {
    console.log('Error: ', err.message);
    return res.status(500).send(err.message);
  }
}

async function getCommentHandler(req, res) {
  try {
    const { commentId } = req.params;
    const comment = await getComment(commentId);
    console.log(comment);

    if (!comment) {
      return res.status(404).send(getGeneratedResponse(false, comment, {
        message: 'No document for this id'
      }));
    }

    return res.status(200).send(getGeneratedResponse(true, comment));
  } catch (err) {
    console.log('Error: ', err.message);
    return res.status(500).send(err.message);
  }
}

async function updateCommentHandler(req, res) {
  try {
    const { commentId } = req.params;
    const comment = await updateComment(commentId, req.body);

    if (!comment) {
      return res.status(404).send(getGeneratedResponse(false, comment, {
        message: 'No document for this id',
      }));
    }

    return res.status(200).send(getGeneratedResponse(true, comment));
  } catch (err) {
    console.log('Error: ', err.message);
    return res.status(500).send(err.message);
  }
}

async function deleteCommentHandler(req, res) {
  try {
    const { movieId, commentId } = req.params;
    const movie = await getMovie(movieId);

    if (!movie) {
      return res.status(404).send(getGeneratedResponse(false, movie, {
        message: 'No movie for this id',
      }));
    }

    const comment = await deleteComment(commentId);

    if (!comment) {
      return res.status(404).send(getGeneratedResponse(false, comment, {
        message: 'No comment for this id',
      }));
    }

    await changeMovieAndSave(movie, () => {
      movie.comments = movie.comments.filter(item => item.toString() !== commentId);
    });

    return res.status(200).send(getGeneratedResponse(true, movie, { comment }));
  } catch (err) {
    console.log('Error: ', err.message);
    return res.status(500).send(err.message);
  }
}

async function deleteAllCommentsHandler(req, res) {
  try {
    const { movieId } = req.params;
    const movie = await getMovie(movieId);

    if (!movie) {
      return res.status(404).send(getGeneratedResponse(false, movie, {
        message: 'No movie for this id',
      }));
    }

    await changeMovieAndSave(movie, () => {
      movie.comments = [];
    });

    const deletedCommentsCount = deleteAllCommentByIdFilm(movieId);

    return res.status(200).send(getGeneratedResponse(true, movie, { deletedCommentsCount }));
  } catch (err) {
    console.log('Error: ', err.message);
    return res.status(500).send(err.message);
  }
}

module.exports = {
  createCommentHandler,
  getCommentsHandler,
  getCommentHandler,
  updateCommentHandler,
  deleteCommentHandler,
  deleteAllCommentsHandler,
};
