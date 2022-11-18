const { movieService } = require('../services');

class Controller {
  create = async ( req, res ) => {
    const newMovie = req.body;
    const movie = await movieService.create(newMovie);

    return res.status(201).send(movie);
  };
  get = async ( req, res ) => {
    const { movieId } = req.params;
    const movie = await movieService.get(movieId);

    return res.status(200).send(movie);
  };
  update = async ( req, res ) => {
    const { movieId } = req.params;
    const newMovie = req.body;
    const movie = await movieService.update(movieId, newMovie);

    return res.status(200).send(movie);
  };
  delete = async ( req, res ) => {
    const { movieId } = req.params;
    await movieService.delete(movieId);

    return res.status(200).send();
  };
  addComment = async ( req, res ) => {
    const { movieId } = req.params;
    const newComment = req.body;
    const movie = await movieService.addComment(movieId, newComment);

    return res.status(200).send(movie);
  };
  deleteComment = async ( req, res ) => {
    const { movieId, commentId } = req.params;
    const movie = await movieService.deleteComment(movieId, commentId);

    return res.status(200).send(movie);
  };
}

const movieController = new Controller();

module.exports = { movieController };
