const Router = require("express").Router;
const router = new Router();

const CommentController = require("../Controllers/comment");

// создать новый комментарий
router.post("/movies/:movieId/comment", CommentController.createNewComment);

module.exports = router;
