const Movie = require('./models/movie');
const Comment = require('./models/comment');
const Category = require('./models/category');

function addRoutes(app) {
  app.post('/category', async (req, res) => {
    try {
      await Category.create(req.body);

      return res.status(201).send('category created');
    } catch (e) {
      return errorHandler({ res, e });
    }
  });

  app.post('/movies', async (req, res) => {
    try {
      await Movie.create(req.body);

      return res.status(201).send('movie created');
    } catch (e) {
      return errorHandler({ res, e });
    }
  });

  app.delete('/movies/:movieId', async (req, res) => {
    const movieId = req.params?.movieId;

    try {
      await Movie.findByIdAndDelete(movieId);

      return res.status(201).send('movie deleted');
    } catch (e) {
      return errorHandler({ res, e });
    }
  });

  app.put('/movies/:movieId', async (req, res) => {
    const movieId = req.params?.movieId;

    try {
      await Movie.findByIdAndUpdate(movieId, req.body);

      return res.status(201).send('movie changed');
    } catch (e) {
      return errorHandler({ res, e });
    }
  });

  app.put('/movies/:movieId/comments', async (req, res) => {
    const movieId = req.params?.movieId;
    const comment = { ...req.body, movieId };

    try {
      await Comment.create(comment);

      return res.status(201).send('comment added');
    } catch (e) {
      return errorHandler({ res, e });
    }
  });
}

function errorHandler({ res, e, status = 400 }) {
  return res.status(status).send(e.message);
}

module.exports = addRoutes;
