const CommentService = require('../services/CommentService');
const MovieService = require('../services/MovieService');
const { getGeneratedResponse } = require('../utils');

class CommentController {
  async addComment(req, res) {
    try {
      const { movieId } = req.params;
      const movie = await MovieService.getMovie(movieId);

      if (!movie) {
        return res.status(404).send(getGeneratedResponse(false, movie, {
          message: 'No movie for this id',
        }));
      }

      const comment = await CommentService.createComment({ movieId, ...req.body });

      movie.comments.push(comment._id);
      await movie.save();

      return res.status(201).send(getGeneratedResponse(true, comment, { movie }));
    } catch (err) {
      console.log('Error: ', err.message);
      return res.status(500).send(err.message);
    }
  }

  async getComments(req, res) {
    try {
      const { movieId } = req.params;
      const movie = await MovieService.getMovie(movieId);

      if (!movie) {
        return res.status(404).send(getGeneratedResponse(false, movie, {
          message: 'No movie for this id',
        }));
      }

      const comments = await CommentService.getComments(movieId);

      return res.status(200).send(getGeneratedResponse(true, comments));
    } catch (err) {
      console.log('Error: ', err.message);
      return res.status(500).send(err.message);
    }
  }

  async getComment(req, res) {
    try {
      const { commentId } = req.params;
      const comment = await CommentService.getComment(commentId);

      if (!comment) {
        return res.status(404).send(getGeneratedResponse(false, comment, {
          message: 'No comment for this id',
        }));
      }

      return res.status(200).send(getGeneratedResponse(true, comment));
    } catch (err) {
      console.log('Error: ', err.message);
      return res.status(500).send(err.message);
    }
  }

  async updateComment(req, res) {
    try {
      const { commentId } = req.params;
      const comment = await CommentService.updateComment(commentId, req.body);

      if (!comment) {
        return res.status(404).send(getGeneratedResponse(false, comment, {
          message: 'No comment for this id',
        }));
      }

      return res.status(200).send(getGeneratedResponse(true, comment));
    } catch (err) {
      console.log('Error: ', err.message);
      return res.status(500).send(err.message);
    }
  }

  async deleteComment(req, res) {
    try {
      const { commentId } = req.params;
      const comment = await CommentService.deleteComment(commentId);

      if (!comment) {
        return res.status(404).send(getGeneratedResponse(false, comment, {
          message: 'No comment for this id',
        }));
      }

      return res.status(200).send(getGeneratedResponse(true, comment));
    } catch (err) {
      console.log('Error: ', err.message);
      return res.status(500).send(err.message);
    }
  }
}

module.exports = new CommentController();
