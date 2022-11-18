const { getMovie, changeMovieAndSave } = require('../services/movieServices');
const { createComment } = require('../services/commentServices');
const { getGeneratedResponse } = require('../utils');

async function addCommentHandler(req, res) {
  try {
    const { movieId } = req.params;
    const movie = await getMovie(movieId);

    if (!movie) {
      return res.status(404).send(
        getGeneratedResponse(false, movie, {
          message: 'No document for this id'
        })
      );
    }

    const comment = await createComment({ movieId, ...req.body });

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

module.exports = {
  addCommentHandler,
};
