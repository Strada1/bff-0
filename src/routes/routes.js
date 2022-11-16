const movies = require('./movies.js');
const categories = require('./catogories.js');

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
}

module.exports = addRoutes;
