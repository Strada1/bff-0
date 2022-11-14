const Movie = require('../models/Movie.js');
const Category = require('../models/Category.js');

function addRoutes(app) {
  app.get('/', async (req, res) => {
    return res.status(200).send('Test Movies app');
  });

  app.post('/movies', async (req, res) => {
    try {
      await Movie.create(req.body);
      return res.status(201).send('movie created'); // возвращаем ответ
    } catch (error) {
      console.log(error);
      return res.status(400).send('failed to create movie');
    }
  });

  app.post('/categories', async (req, res) => {
    try {
      await Category.create(req.body);
      return res.status(201).send('category created');
    } catch (error) {
      console.log(error);
      return res.status(400).send('failed to add category');
    }
  });
}

module.exports = addRoutes;
