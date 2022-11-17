const Router = require("express").Router;
const router = new Router();

const CommentController = require("../Controllers/comment");

// создать новый комментарий
router.post("/comment", CommentController.createNewComment);

module.exports = router;
