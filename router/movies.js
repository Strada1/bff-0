const Router = require("express");
const { findMovies, createMovie, updateMovie, deleteMovie } = require("../services/movieService");

const movies = new Router();

movies.get('/movies', async (req, res) => {
    try {
        const movies = await findMovies();
        return res.status(200).send(movies);
    } catch (e) {
        return res.status(500).send(e.message);
    }
});

movies.post('/movies', async (req, res) => {
    try {
        const movie = await createMovie(req.body);
        return res.status(201).send(movie);
    } catch (e) {
        return res.status(500).send(e.message);
    }
});

movies.put('/movies', async (req, res) => {
    try {
        const movie = await updateMovie(req.body);
        return res.status(200).send(movie);
    } catch (e) {
        return res.status(500).send(e.message);
    }
});

movies.delete('/movies', async (req, res) => {
    try {
        await deleteMovie(req.body);
        return res.status(200).send('delete');
    } catch (e) {
        return res.status(500).send(e.message);
    }
});

module.exports = movies;