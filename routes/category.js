const dbFnCategory = require('../db-functions/category');
const helpers = require('../helpers');
const { errorHandler } = helpers;

function addRoutes(app) {
  app.post('/category', async (req, res) => {
    try {
      await dbFnCategory.createCategory(req.body);

      return res.status(201).send('category created');
    } catch (e) {
      return errorHandler({ res, e });
    }
  });
}

module.exports = addRoutes;
