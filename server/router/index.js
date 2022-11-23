import { Router } from 'express';

const router = new Router();

import * as MovieController from '../controllers/movie.js';
import * as CommentController from '../controllers/comment.js';
import * as CategoryController from '../controllers/category.js';

// Movies
router.post('/movies', MovieController.createMovie); // create movie: POST '/movies' (body)
router.get('/movies/:movieId', MovieController.getMovie); // get movie by id: GET '/movies/${movieId}'
router.get('/movies', MovieController.getMovies); // get movies: GET '/movies'
router.put('/movies/:movieId', MovieController.updateMovie); // update movie by id: PUT '/movies/${movieId}' (body)
router.delete('/movies/:movieId', MovieController.deleteMovie); // delete movie by id: DELETE '/movies/${movieId}'
// router.get('/movies/'); // Получить фильмы по категории ???

// Comments
router.post('/comments', CommentController.createComment); // create comment by movie id: POST 'comments?movieId=12312312' (body)
router.get('/comments/:commentId', CommentController.getComment); // get comment by id: GET '/comments/${commentId}'
router.get('/comments', CommentController.getComments); // get comments by id: GET: '/comments' | get all comments: GET '/comments?movieId=12312312'
router.put('/comments/:commentId', CommentController.updateComment); // update comment: PUT '/comments/${commentId}'
router.delete('/comments/:commentId', CommentController.deleteComment); // delete comment by id: DELETE '/comments/${commentId}'

// Categories
router.post('/categories', CategoryController.createCategory); // create category: POST '/category' (body) | create category categories and in movie categories: POST '/category?movieId=12312312' (body)
router.get('/categories/:categoryId', CategoryController.getCategory); // get category by id: GET '/categories/${categoryId}'
router.get('/categories', CategoryController.getCategories); // get all category: GET '/categories' | get categories of movie: GET '/categories?movieId=12312312'
router.put('/categories/:categoryId', CategoryController.updateCategory); // update category by id | PUT '/category/${categoryId}'
router.delete('/categories/:categoryId', CategoryController.deleteCategory); // delete category in categories and in all movies in categories: DELETE '/categories/:categoryId' | delete category in movie categories: DELETE '/categories/:categoryId?movieId=12312312'

// Directors
//...

export default router;
