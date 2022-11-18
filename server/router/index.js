const router = require('express').Router();

const {
  getMoviesHandler,
  createMovieHandler,
  deleteMovieHandler,
  updateMovieHandler,
} = require('../handlers/movieHandlers');
const { createCategoryHandler } = require('../handlers/categoryHandlers');
const {
  createCommentHandler,
  getCommentsHandler,
  getCommentHandler,
  updateCommentHandler,
  deleteCommentHandler,
  deleteAllCommentsHandler
} = require('../handlers/commentHandlers');

/*
Movie
- С + Создать фильм
- R + Получить все фильмы | Получить фильм по id
- U + Обновить фильм по id
- D + Удалить фильм по id
Category
- С + Создать категорию
- R Получить категорию
- U Обновить категорию (поменять ей название)
- D Удалить категорию (удалить категорию в коллекции и во всех фильмах из полей)
Comments
- C + Создать комментарий
- R + Прочитать комментарии по id фильма | Прочитать комментарий (по его id)
- U + Обновить комментарий (по его id)
- D + Удалить комментарий (у фильма и в коллекции comments)
Director
- C
- R
- U
- D
*/

// Movies
router.post('/movies', createMovieHandler);
router.get('/movies', getMoviesHandler);
router.put('/movies/:movieId', updateMovieHandler);
router.delete('/movies/:movieId', deleteMovieHandler);

// Categories
router.post('/categories', createCategoryHandler);

// Comments
router.post('/movies/:movieId/comments', createCommentHandler);
router.get('/movies/:movieId/comments', getCommentsHandler);
router.get('/comments/:commentId', getCommentHandler);
router.put('/comments/:commentId', updateCommentHandler);
router.delete('/movies/:movieId/comments/:commentId', deleteCommentHandler);
router.delete('/movies/:movieId/comments', deleteAllCommentsHandler);

// Director


module.exports = router;
