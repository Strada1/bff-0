const Router = require("express");
const { checkSchema } = require('express-validator');
const { createMovie, updateMovie, deleteMovie, getMovies} = require("../services/movieService");
const checkError = require("../helpers/checkError");

const movies = new Router();

// Добавить сортировку в запрос всех фильмов и в запрос с категориями.

movies.get(
    '/movies',
    async (req, res) => {
        try {
            const { title, year, director, rating, category } = req.query;
            const { sort } = req.query;

            const movies = await getMovies({
                filters: { title, year: +year, director, rating: +rating, category },
                sort,
            });
            return res.status(200).send(movies);
        } catch (e) {
            return res.status(500).send(e.message);
        }
    }
);

movies.post(
    '/movies',
    checkSchema({
        title: {
            in: ['body'],
            isString: true,
            isLength: {
                errorMessage: 'Title should be at least 2 chars long',
                options: { min: 2 },
            },
        },
        year: {
            in: ['body'],
            isNumeric: true,
        },
        rating: {
            in: ['body'],
            isNumeric: true,
        },
        director: {
            in: ['body'],
            isMongoId: true,
        },
        category: {
            in: ['body'],
            isMongoId: true,
        },
    }),
    checkError,
    async (req, res) => {
        try {
            const movie = await createMovie(req.body);
            return res.status(201).send(movie);
        } catch (e) {
            return res.status(500).send(e.message);
        }
    }
);

movies.put(
    '/movies/:movieId',
    checkSchema({
        movieId: {
            in: ['params'],
            isMongoId: true,
        },
    }),
    checkError,
    async (req, res) => {
        try {
            const { movieId } = req.params;
            const movie = await updateMovie({ movieId, ...req.body });
            return res.status(200).send(movie);
        } catch (e) {
            return res.status(500).send(e.message);
        }
    }
);

movies.delete(
    '/movies/:movieId',
    checkSchema({
        movieId: {
            in: ['params'],
            isMongoId: true,
        },
    }),
    checkError,
    async (req, res) => {
        try {
            const { movieId } = req.params;
            await deleteMovie(movieId);
            return res.status(200).send('delete');
        } catch (e) {
            return res.status(500).send(e.message);
        }
    }
);


module.exports = movies;