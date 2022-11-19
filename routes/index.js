const addMovieRoutes = require('./movie');
const addCategoryRoutes = require('./category');
const addCommentRoutes = require('./comment');
const addDirectorRoutes = require('./director');

module.exports = function (app) {
  addMovieRoutes(app);
  addCategoryRoutes(app);
  addCommentRoutes(app);
  addDirectorRoutes(app);
};
