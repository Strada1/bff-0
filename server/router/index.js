const router = require('express').Router();
const {
  MovieController,
  CategoryController,
  CommentController,
  DirectorController,
} = require('../controllers/');

// Movies
router.post('/movies', MovieController.createMovie);
router.get('/movies', MovieController.getMovies);
router.get('/movies/:movieId', MovieController.getMovie);
router.put('/movies/:movieId', MovieController.updateMovie);
router.delete('/movies/:movieId', MovieController.deleteMovie);

// Comments
router.post('/movies/:movieId/comments', CommentController.addComment);
router.get('/movies/:movieId/comments', CommentController.getComments);
router.get('/comments/:commentId', CommentController.getComment);
router.put('/comments/:commentId', CommentController.updateComment);
router.delete('/comments/:commentId', CommentController.deleteComment);

// Category
router.post('/movies/:movieId/categories', CategoryController.createCategory);
router.get('/categories', CategoryController.getCategories);
router.put('/categories/:categoryId', CategoryController.updateCategory);
router.delete('/categories/:categoryId', CategoryController.deleteCategory);

// Directors
router.post('/movies/:movieId/directors', DirectorController.createDirector);
router.get('/directors/:directorId', DirectorController.getDirector);
router.put('/directors/:directorId', DirectorController.updateDirector);
router.delete('/directors/:directorId', DirectorController.deleteDirector);

module.exports = router;
