const dbFnDirector = require('../db-functions/director');
const helpers = require('../helpers');
const { errorHandler } = helpers;

function addRoutes(app) {
  app.post('/directors', async (req, res) => {
    try {
      await dbFnDirector.createDirector(req.body);

      return res.status(201).send('director created');
    } catch (e) {
      return errorHandler({ res, e });
    }
  });
}

module.exports = addRoutes;
