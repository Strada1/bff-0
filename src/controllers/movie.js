const { movieService } = require('../services');
const fs = require('fs/promises');

class Controller {
  create = async ( req, res ) => {
    const newMovie = req.body;
    const movie = await movieService.create(newMovie);

    return res.status(201).send(movie);
  };

  createFromFile = async ( req, res ) => {
    let file;
    try {
      file = await fs.readFile('src/movies.json', { encoding: 'utf8' });
    } catch (e) {
      console.log(e);
    }

    const fileJSON = JSON.parse(file);
    const movies = await movieService.createFromJSON(fileJSON);

    return res.status(201).send(movies);
  };
  get = async ( req, res ) => {
    const { filters, sort} = req.body;

    const movies = await movieService.get({
      filters: {
        category: filters.category,
        year: filters.year,
        director: filters.director
      },
      sort: {
        title: sort.title,
        category: sort.category,
        year: sort.year,
        director: sort.director
      },
    });

    return res.status(200).send(movies);
  };
  getDirectorMoviesCount = async ( req, res ) => {
    const { directorId } = req.params;

    const count = await movieService.getDirectorMoviesCount(directorId);

    return res.status(200).send(count);
  };
  getBetween1999And2010 = async ( req, res ) => {
    const movies = await movieService.getBetween1999And2010();

    return res.status(200).send(movies);
  };
  getOne = async ( req, res ) => {
    const { movieId } = req.params;
    const movie = await movieService.getOne(movieId);

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

    return res.status(201).send(movie);
  };
  updateComment = async ( req, res ) => {
    const { commentId } = req.params;
    const newComment = req.body;
    const comment = await movieService.updateComment(commentId, newComment);

    return res.status(200).send(comment);
  };
  deleteComment = async ( req, res ) => {
    const { movieId, commentId } = req.params;
    const movie = await movieService.deleteComment(movieId, commentId);

    return res.status(200).send(movie);
  };
}

const movieController = new Controller();

module.exports = { movieController };
