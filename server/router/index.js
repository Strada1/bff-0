import { Router } from 'express';

import * as MovieController from '../controllers/movie.js';
import * as CommentController from '../controllers/comment.js';
import * as CategoryController from '../controllers/category.js';

import {
  movieCreateValidation,
  commentCreateValidation,
  categoryCreateValidation,
  handleValidationErrors
} from '../utils/index.js';

const router = new Router();

// Movies
router.post('/movies', handleValidationErrors(movieCreateValidation), MovieController.createMovie);
router.get('/movies/:movieId', MovieController.getMovie);
router.get('/movies', MovieController.getMovies);
router.put('/movies/:movieId', MovieController.updateMovie);
router.delete('/movies/:movieId', MovieController.deleteMovie);

// Comments
router.post('/comments', handleValidationErrors(commentCreateValidation), CommentController.createComment);
router.get('/comments/:commentId', CommentController.getComment);
router.get('/comments', CommentController.getComments);
router.put('/comments/:commentId', CommentController.updateComment);
router.delete('/comments/:commentId', CommentController.deleteComment);

// Categories
router.post('/categories', handleValidationErrors(categoryCreateValidation), CategoryController.createCategory);
router.get('/categories/:categoryId', CategoryController.getCategory);
router.get('/categories', CategoryController.getCategories);
router.put('/categories/:categoryId', CategoryController.updateCategory);
router.delete('/categories/:categoryId', CategoryController.deleteCategory);

// Directors
//...

export default router;
