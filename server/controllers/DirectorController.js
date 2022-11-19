const DirectorService = require('../services/DirectorService');
const MovieService = require('../services/MovieService');
const { getGeneratedResponse } = require('../utils/');

class DirectorController {
  async createDirector(req, res) {
    try {
      const { movieId } = req.params;
      const movie = await MovieService.getMovie(movieId);

      if (!movie) {
        return res.status(404).send(getGeneratedResponse(false, movie, {
          message: 'No movie for this id',
        }));
      }

      const director = await DirectorService.createDirector(req.body);

      movie.director = director._id;
      await movie.save();

      return res.status(201).send(getGeneratedResponse(true, director, { movie }));
    } catch (err) {
      console.log('Error: ', err.message);
      return res.status(500).send(err.message);
    }
  }

  async getDirector(req, res) {
    try {
      const { directorId } = req.params;
      const director = await DirectorService.getDirector(directorId);

      if (!director) {
        return res.status(404).send(getGeneratedResponse(false, director, {
          message: 'No director for this id',
        }));
      }

      return res.status(200).send(getGeneratedResponse(true, director));
    } catch (err) {
      console.log('Error: ', err.message);
      return res.status(500).send(err.message);
    }
  }

  async updateDirector(req, res) {
    try {
      const { directorId } = req.params;
      const director = await DirectorService.updateDirector(directorId, req.body);

      if (!director) {
        return res.status(404).send(getGeneratedResponse(false, director, {
          message: 'No director for this id',
        }));
      }

      return res.status(200).send(getGeneratedResponse(true, director));
    } catch (err) {
      console.log('Error: ', err.message);
      return res.status(500).send(err.message);
    }
  }

  async deleteDirector(req, res) {
    try {
      const { directorId } = req.params;
      const director = await DirectorService.deleteDirector(directorId);

      if (!director) {
        return res.status(404).send(getGeneratedResponse(false, director, {
          message: 'No director for this id',
        }));
      }

      return res.status(200).send(getGeneratedResponse(true, director));
    } catch (err) {
      console.log('Error: ', err.message);
      return res.status(500).send(err.message);
    }
  }
}

module.exports = new DirectorController();
