const Movies = require('express');
const {PATH} = require('../constant/constant');
const Movie = require('../models/MovieSchema');

const movies = new Movies();

movies.get(PATH.MOVIES, async (req, res) => {
    try {
        const _movie = await Movie.find({});
        return res.send(_movie);
    } catch (e) {
        return res.status(500).send(e);
    }
})

movies.post(PATH.MOVIES, async (req, res) => {
    try {
        const {title, year, rating} = req.body;

        const _movie = await Movie.create({title, year, rating});

        return res.send(_movie);
    } catch (e) {
        return res.status(500).send(e);
    }
});


movies.put(PATH.MOVIES, async (req, res) => {
    try {
        const {id, title, year, rating} = req.body;

        const _movie = await Movie.findByIdAndUpdate(id, {title, year, rating}, {returnDocument: 'after'});

        return res.send(_movie);
    } catch (e) {
        return res.status(500).send(e);
    }
})


movies.delete(PATH.MOVIES, async (req, res) => {
    try {
        const {id} = req.body;

        const _movie = await Movie.findByIdAndDelete(id);

        return res.send(_movie);
    } catch (e) {
        return res.status(500).send(e);
    }
});

module.exports = movies;