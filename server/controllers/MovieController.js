const MovieService = require('../services/MovieService');
const CommentService = require('../services/CommentService');
const { getGeneratedResponse } = require('../utils/');

class MovieController {
  async createMovie(req, res) {
    try {
      const movie = await MovieService.createMovie(req.body);

      return res.status(201).send(getGeneratedResponse(true, movie));
    } catch (err) {
      console.log('Error: ', err.message);
      return res.status(500).send(err.message);
    }
  }

  async getMovie(req, res) {
    try {
      const { movieId } = req.params;
      const movie = await MovieService.getMovie(movieId);

      if (!movie) {
        return res.status(404).send(getGeneratedResponse(false, movie, {
          message: 'No movie for this id',
        }));
      }

      return res.status(200).send(getGeneratedResponse(true, movie));
    }  catch(err) {
      console.log('Error: ', err.message);
      return res.status(500).send(err.message);
    }
  }

  async getMovies(req, res) {
    try {
      const movies = await MovieService.getMovies();

      return res.status(200).send(getGeneratedResponse(true, movies));
    } catch (err) {
      console.log('Error: ', err.message);
      return res.status(500).send(err.message);
    }
  }

  async updateMovie(req, res) {
    try {
      const { movieId } = req.params;
      const movie = await MovieService.updateMovie(movieId, req.body);

      if (!movie) {
        return res.status(404).send(getGeneratedResponse(false, movie, {
          message: 'No movie for this id',
        }));
      }

      return res.status(200).send(getGeneratedResponse(true, movie));
    } catch (err) {
      console.log('Error: ', err.message);
      return res.status(500).send(err.message);
    }
  }

  async deleteMovie(req, res) {
    try {
      const { movieId } = req.params;
      const movie = await MovieService.deleteMovie(movieId);

      if (!movie) {
        return res.status(404).send(getGeneratedResponse(false, movie, {
          message: 'No movie for this id',
        }));
      }

      let deletedCommentsCount = 0;
      if (movie.comments.length > 0) {
        deletedCommentsCount = await CommentService.deleteAllCommentByIdFilm(movieId);
      }

      return res.status(200).send(getGeneratedResponse(true, movie, { deletedCommentsCount }));
    } catch (err) {
      console.log('Error: ', err.message);
      return res.status(500).send(err.message);
    }
  }
}

module.exports = new MovieController();
