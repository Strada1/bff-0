const Router = require("express");
const { checkSchema } = require('express-validator');

const {createMovie, updateMovie, getMovies} = require("../services/movieService");
const {deleteMovieWithComment} = require("../services/MovieAndCommentService");
const {getMoviesCache, setMoviesCache} = require("../helpers/cache");
const checkError = require("../helpers/checkError");
const {passportAuth} = require("../helpers/passportAuth");

const movies = new Router();

movies.get(
    '/movies',
    async (req, res) => {
        try {
            const { title, year, director, rating, category } = req.query;
            const { sort } = req.query;

            const hasQuery = !!(title || year || director || rating || category || sort);
            if (!hasQuery) {
                const cache = getMoviesCache();
                const isNotEmpty = !!cache;
                if (isNotEmpty) {
                    return res.status(200).send(cache);
                }
                await setMoviesCache();
            }

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
    // passportAuth,
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
            await setMoviesCache();
            return res.status(201).send(movie);
        } catch (e) {
            return res.status(500).send(e.message);
        }
    }
);

movies.put(
    '/movies/:movieId',
    passportAuth,
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
            await setMoviesCache();
            return res.status(200).send(movie);
        } catch (e) {
            return res.status(500).send(e.message);
        }
    }
);

movies.delete(
    '/movies/:movieId',
    passportAuth,
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
            await deleteMovieWithComment(movieId);
            await setMoviesCache();
            return res.status(200).send('delete');
        } catch (e) {
            return res.status(500).send(e.message);
        }
    }
);

module.exports = movies;