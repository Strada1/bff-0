const movie = require('../models/moviesModel/moviesModel');
const errorGetDefault = require('../consts/errorGetDefault');

function allRoutings(app) {
  app.get('/movies', (req, res) => {
    try {
      return res.status(200).send(movie);
    } catch (err) {
      console.log(`${err.name}: ${err.message}`);
      return res.status(500).send(`${errorGetDefault} movies`);
    }
  });

  app.post('/movies', (req, res) => {
    try {
      return res.status(201).send(movie);
    } catch (err) {
      console.log(`${err.name}: ${err.message}`);
      return res.status(500).send(`${errorGetDefault} movies`);
    }
  });
}

module.exports = allRoutings;
