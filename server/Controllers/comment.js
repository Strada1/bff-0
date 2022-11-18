const commentService = require("../Service/commentService");
const movieService = require("../Service/movieService");
const MovieModel = require("../models/movie");
const {default: mongoose} = require("mongoose");
const CommentModel = require("../models/comment");

module.exports = {
    getAllComments: async (req, res) => {
        const comments = await CommentModel.find({});
        res.send(comments);
        // MovieModel.find({}, function (err, result) {
        //     if (err) {
        //         console.log(err.message);
        //         res.send(err);
        //     } else {
        //         res.send(result);
        //     }
        // });
    },

    createNewComment: async (req, res, next) => {
        try {
            const movieId = req.params.movieId;
            // подозреваю, что нужно будет делать проверку на существование id фильма
            const movie = await MovieModel.findById(movieId);
            if (!movie) {
                return res.status(400).send("Movie does not exist");
            }
            console.log(req.body);
            const comment = await commentService.createNewComment(req.body);
            console.log(comment.id);

            return res.status(201).send({code: 201, message: "add comment", comment});
        } catch (err) {
            console.log(err);
            if (err instanceof mongoose.CastError) {
                return res.status(400).send("Invalid Movie Id");
            }
            if (err.name === "ValidationError") {
                return res.status(422).send(err.message);
            }
            next(err);
        }
    },

    findCommentsByMovieId: async (req, res, next) => {
        try {
            const movieId = req.params.movieId;
            const movie = await MovieModel.findById(movieId);
            if (!movie) {
                return res.status(400).send("Movie does not exist");
            }
            console.log(req.body);

            const comments = await commentService.findCommentsByMovieId(movieId);
            console.log(comments.id);

            return res.status(201).send({code: 201, message: "all comment", comments});
        } catch (err) {
            console.log(err);
            if (err instanceof mongoose.CastError) {
                return res.status(400).send("Invalid Movie Id");
            }
            if (err.name === "ValidationError") {
                return res.status(422).send(err.message);
            }
            next(err);
        }
    },

    updateComment: async (req, res, next) => {
        try {
            const movieId = req.params.movieId;
            const movie = await movieService.findMovieById(movieId);
            if (!movie) {
                return res.status(400).send("Movie does not exist");
            }

            const commentId = req.params.commentId;
            // const comment = commentService.findCommentById(commentId);
            // if (!comment) {
            //     return res.status(400).send("Comment does not exist");
            // }
            const updates = req.body;
            const options = {new: true};

            const commentUpdate = await commentService.updateComment(commentId, updates, options);

            if (!commentUpdate) {
                return res.status(404).send("Comment does not exist");
            }

            return res.status(200).send(commentUpdate);
        } catch (err) {
            console.log(err.message);
            if (err instanceof mongoose.CastError) {
                return res.status(400).send("Invalid Comment Id");
            }
            next(err);
        }
    },

    deleteComment: async (req, res, next) => {
        try {
            const movieId = req.params.movieId;
            const movie = await movieService.findMovieById(movieId);
            if (!movie) {
                return res.status(400).send("Movie does not exist");
            }

            const commentId = req.params.commentId;

            // const comment = await commentService.deleteComment(commentId);
            // не работает обработка ошибок с сервисом при удалении

            const comment = await CommentModel.findByIdAndDelete(commentId);

            if (!comment) {
                return res.status(404).send("Comment does not exist");
            }

            return res.status(200).send("Comment deleted successfully");
        } catch (err) {
            console.log(err.message);
            if (err instanceof mongoose.CastError) {
                return res.status(400).send("Invalid Comment Id");
            }
            next(err);
        }
    }
};
