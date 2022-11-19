const dbFnMovie = require('../db-functions/movie');
const helpers = require('../helpers');
const { errorHandler } = helpers;

function addRoutes(app) {
  app.post('/movies', async (req, res) => {
    try {
      await dbFnMovie.createMovie(req.body);

      return res.status(201).send('movie created');
    } catch (e) {
      return errorHandler({ res, e });
    }
  });

  app.delete('/movies/:movieId', async (req, res) => {
    const movieId = req.params?.movieId;

    try {
      await dbFnMovie.deleteMovie(movieId);

      return res.status(201).send('movie deleted');
    } catch (e) {
      return errorHandler({ res, e });
    }
  });

  app.put('/movies/:movieId', async (req, res) => {
    const movieId = req.params?.movieId;

    try {
      await dbFnMovie.updateMovie(movieId, req.body);

      return res.status(201).send('movie changed');
    } catch (e) {
      return errorHandler({ res, e });
    }
  });

  app.get('/movies', async (req, res) => {
    try {
      const movies = await dbFnMovie.getMovies();

      return res.status(201).send(JSON.stringify(movies));
    } catch (e) {
      return errorHandler({ res, e });
    }
  });

  app.get('/movies/:movieId', async (req, res) => {
    const movieId = req.params?.movieId;

    try {
      const movie = await dbFnMovie.getMovie(movieId);

      return res.status(201).send(JSON.stringify(movie));
    } catch (e) {
      return errorHandler({ res, e });
    }
  });
}

module.exports = addRoutes;
