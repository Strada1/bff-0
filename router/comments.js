const Router = require('express');
const { findByIdMovie, updateMovie } = require("../services/movieService");
const { createComment, updateComment, deleteComment } = require("../services/commentsService");

const comments = new Router();

comments.get('/movies/:movieId/comments', async (req, res) => {
    try {
        const movieId = req.params.movieId;
        const movie = await findByIdMovie(movieId);
        const comments = movie.comments;
        return res.status(200).send(comments);
    } catch (e) {
        return res.status(500).send(e.message);
    }
});

comments.post('/movies/:movieId/comments', async (req, res) => {
    try {
        const movieId = req.params.movieId;
        const movie = await findByIdMovie(movieId);
        const comments = movie.comments;

        const comment = await createComment(req.body);
        comments.push(comment.id);

        const changeMovie = await updateMovie({id: movieId, comments});

        return res.status(201).send(changeMovie.value.comments);
    } catch (e) {
        return res.status(500).send(e.message);
    }
});

comments.put('/movies/:movieId/comments/:commentId', async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const comment = await updateComment({id: commentId, ...req.body});
        return res.status(200).send(comment);
    } catch (e) {
        return res.status(500).send(e.message);
    }
})

comments.delete('/movies/:movieId/comments/:commentId', async (req, res) => {
    try {
        const { commentId } = req.params;
        await deleteComment(commentId);
        return res.status(200).send('delete');
    } catch (e) {
        return res.status(500).send(e.message);
    }
});

module.exports = comments;