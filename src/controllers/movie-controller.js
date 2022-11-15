const { Movie } = require('../models');


class Controller {
  create = async ( req, res ) => {
    const movieJSON = req.body;
    const movie = await Movie.create(movieJSON);
    return res.status(201).send(movie);
  };

  get = async ( req, res ) => {
    const { id } = req.params;
    const movie = await Movie.findById(id);

    return res.status(200).send(JSON.stringify(movie));
  };
}

const movieController = new Controller();

module.exports = { movieController };
