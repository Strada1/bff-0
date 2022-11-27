const mongoose = require("mongoose");
const {validationResult} = require("express-validator");

const MovieModel = require("../models/movie");
const movieService = require("../Service/movieService");

module.exports = {
    getAllMovies: async (req, res) => {
        const movies = await MovieModel.find({}).populate("director").populate("category");
        res.send(movies);
        // MovieModel.find({}, function (err, result) {
        //     if (err) {
        //         console.log(err.message);
        //         res.send(err);
        //     } else {
        //         res.send(result);
        //     }
        // });
    },

    findMovieById: async (req, res) => {
        const id = req.params.id;
        MovieModel.findById(id, function (err, result) {
            if (err) {
                console.log(err.message);
                if (err instanceof mongoose.CastError) {
                    return res.status(400).send("Invalid Movie Id");
                }
                res.send(err);
            } else if (!result) {
                return res.status(400).send("Movie does not exist");
            } else {
                res.send(result);
            }
        })
            .populate("category")
            .populate("director");
    },

    createNewMovie: async (req, res, next) => {
        try {
            // можно в каждом контроллере отдельно прописывать эту палидацию или сделать
            // функцию validateAll
            // const errors = validationResult(req);
            // if (!errors.isEmpty()) {
            //     return res.status(400).json({errors: errors.array()});
            // }
            const result = await movieService.createNewMovie(req.body);
            return res.status(201).send({code: 201, message: "movie created", movie: result});
        } catch (err) {
            console.log(err);
            if (err.name === "ValidationError") {
                return res.status(422).send(err.message);
            }
            next(err);
        }
    },

    updateMovie: async (req, res, next) => {
        try {
            const id = req.params.id;
            const updates = req.body;
            const options = {new: true};

            const movie = await movieService.updateMovie(id, updates, options);

            if (!movie) {
                return res.status(404).send("Movie does not exist");
            }

            return res.status(200).send(movie);
        } catch (err) {
            console.log(err.message);
            if (err instanceof mongoose.CastError) {
                return res.status(400).send("Invalid Movie Id");
            }
            next(err);
        }
    },

    deleteMovie: async (req, res, next) => {
        try {
            const id = req.params.id;

            const movie = movieService.deleteMovie(id);

            if (!movie) {
                return res.status(404).send("Movie does not exist");
            }

            return res.status(200).send(movie);
        } catch (err) {
            console.log(err.message);
            if (err instanceof mongoose.CastError) {
                return res.status(400).send("Invalid Movie Id");
            }
            next(err);
        }
    }
};
