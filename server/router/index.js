const { Movie, Category } = require('../models/');

module.exports = function (app) {

  app.get('/', async (req, res) => {
    try {
      const movies = await Movie.find();
      return res.status(200).send(movies);
    } catch (err) {
      return res.status(500).send('error');
    }
  });

  app.post('/movies', async (req, res) => {
    try {
      const movie = await Movie.create(req.body); // создаем новый документ для модели Movie
      return res.status(201).send(movie);
    } catch (err) {
      console.log('Error:', err.message);
      return res.status(500).send(err.message);
    }
  });

  app.post('/categories', async (req, res) => {
    try {
      const category = await Category.create(req.body);
      return res.status(201).send(category);
    } catch (err) {
      console.log('Error:', err.message);
      return res.status(500).send(err.message);
    }
  });

};
