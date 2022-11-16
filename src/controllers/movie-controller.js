const { Movie } = require('../models');


class Controller {
  create = async ( req, res ) => {
    const newMovie = req.body;
    const movie = await Movie.create(newMovie);

    return res.status(201).send(movie);
  };

  get = async ( req, res ) => {
    const { movieId } = req.params;
    const movie = await Movie.findById(movieId);

    return res.status(200).send(movie);
  };

  update = async ( req, res ) => {
    const { movieId } = req.params;
    const newMovie = req.body;
    const movie = await Movie.findByIdAndUpdate(movieId, newMovie, { new: true });

    return res.status(200).send(movie);
  };

  delete = async ( req, res ) => {
    const { movieId } = req.params;
    await Movie.findByIdAndDelete(movieId);

    return res.status(200).send();
  };
}

const movieController = new Controller();

module.exports = { movieController };
