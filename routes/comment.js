const dbFnComment = require('../db-functions/comment');
const helpers = require('../helpers');
const { errorHandler } = helpers;

function addRoutes(app) {
  app.put('/movies/:movieId/comments', async (req, res) => {
    const movieId = req.params?.movieId;
    const comment = { ...req.body, movieId };

    try {
      await dbFnComment.createComment(comment);

      return res.status(201).send('comment added');
    } catch (e) {
      return errorHandler({ res, e });
    }
  });
}

module.exports = addRoutes;
