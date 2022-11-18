const movies = require('./movies.js');
const categories = require('./catogories.js');
const comments = require('./comments.js');
const directors = require('./directors.js');

function addRoutes(app) {
  app.get('/', async (req, res) => {
    try {
      return res.status(200).send('Test Movies app');
    } catch (error) {
      return res.status(500).send('Server error: ' + error.message);
    }
  });

  app.use('/movies', movies);
  app.use('/categories', categories);
  app.use('/comments', comments);
  app.use('/directors', directors);
}

module.exports = addRoutes;
