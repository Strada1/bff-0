import { Router } from 'express';

import * as MovieController from '../controllers/movie.js';
import * as CommentController from '../controllers/comment.js';
import * as CategoryController from '../controllers/category.js';
import * as DirectorController from '../controllers/director.js';

import { getCountDirectorMovies } from '../services/movie.js';
import { getMoviesBetweenYears } from '../services/movie.js';

import {
  movieCreateValidation,
  commentCreateValidation,
  categoryCreateValidation,
  directorCreateValidation,
  handleValidationErrors,
} from '../utils/index.js';

const router = new Router();

router.post('/movies', handleValidationErrors(movieCreateValidation), MovieController.createMovie);
router.get('/movies/:movieId', MovieController.getMovie);
router.get('/movies', MovieController.getMovies);
router.put('/movies/:movieId', MovieController.updateMovie);
router.delete('/movies/:movieId', MovieController.deleteMovie);

router.post('/comments', handleValidationErrors(commentCreateValidation), CommentController.createComment);
router.get('/comments/:commentId', CommentController.getComment);
router.get('/comments', CommentController.getComments);
router.put('/comments/:commentId', CommentController.updateComment);
router.delete('/comments/:commentId', CommentController.deleteComment);

router.post('/categories', handleValidationErrors(categoryCreateValidation), CategoryController.createCategory);
router.get('/categories/:categoryId', CategoryController.getCategory);
router.get('/categories', CategoryController.getCategories);
router.put('/categories/:categoryId', CategoryController.updateCategory);
router.delete('/categories/:categoryId', CategoryController.deleteCategory);

router.post('/directors', handleValidationErrors(directorCreateValidation), DirectorController.createDirector);
router.get('/directors/:directorId', DirectorController.getDirector);
router.get('/directors/', DirectorController.getDirectors);
router.put('/directors/:directorId', DirectorController.updateDirector);
router.delete('/directors/:directorId', DirectorController.deleteDirector);

router.get('/aggregation/movies/directors/:directorId', async (req, res) => {
  try {
    const { directorId } = req.params;
    const result = await getCountDirectorMovies(directorId);
    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.get('/aggregation/movies/', async (req, res) => {
  try {
    const { minYear, maxYear } = req.query;
    const result = await getMoviesBetweenYears(minYear, maxYear);
    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

export default router;
