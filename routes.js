const models = require('./models');

function addRoutes(app) {
  app.post('/movies', async (req, res) => {
    try {
      const movie = await models.movie.create(req.body);

      return res.status(201).send('movie created');
    } catch (e) {
      return res.status(201).send(e.code);
    }
  });

  app.post('/category', async (req, res) => {
    try {
      const category = await models.category.create(req.body);

      return res.status(201).send('category created');
    } catch (e) {
      return res.status(201).send(e.code);
    }
  });
}

module.exports = addRoutes;
