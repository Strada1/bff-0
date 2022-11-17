const mongoose = require("mongoose");

const movieModel = require("../models/movie");

module.exports = {
    getAllMovies: (req, res) => {
        movieModel.find({}, function (err, result) {
            if (err) {
                console.log(err.message);
                res.send(err);
            } else {
                res.send(result);
            }
        });
    },

    findMovieById: (req, res) => {
        const id = req.params.id;
        movieModel.findById(id, function (err, result) {
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
        });
    },

    createNewMovie: async (req, res, next) => {
        try {
            const movie = await movieModel.create(req.body);
            return res.status(201).send({code: 201, message: "movie created", movie});
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

            const movie = await movieModel.findByIdAndUpdate(id, updates, options);

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

            const movie = await movieModel.findByIdAndDelete(id);

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
