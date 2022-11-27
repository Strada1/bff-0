const Router = require("express").Router;
const router = new Router();

const CommentController = require("../Controllers/comment");

const ValidateMiddleware = require("../middlewares/validate-middleware");

const validateAll = require("../middlewares/validateAll");

// получить список всех комментариев
router.get("/comments", CommentController.getAllComments);

// создать новый комментарий
router.post(
    "/movies/:movieId/comment",
    validateAll(ValidateMiddleware(["movieId", "text"])),
    CommentController.createNewComment
);

// найти комментарии по id фильма
router.get("/movies/:movieId/comments", CommentController.findCommentsByMovieId);

// изменить комментарий по id у фильма
router.put("/movies/:movieId/comment/:commentId", CommentController.updateComment);

// удалить комментарий по id у фильма
router.delete("/movies/:movieId/comment/:commentId", CommentController.deleteComment);

module.exports = router;
