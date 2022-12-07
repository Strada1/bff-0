const Router = require("express");
const {getCountMoviesByDirectors, getCountMoviesBetweenDate} = require("../services/otherService");
const {checkSchema} = require("express-validator");
const checkError = require("../helpers/checkError");

const other = new Router();

other.post(
    '/director/:directorId/countmovies',
    checkSchema({
        directorId: {
            in: ['params'],
            isMongoId: true,
        },
    }),
    checkError,
    async (req, res) => {
        try {
            const { directorId } = req.params
            const count = await getCountMoviesByDirectors(directorId);
            return res.status(200).send(count);
        } catch (e) {
            return res.status(500).send(e.message);
        }
    }
);

other.post(
    '/movies/count',
    checkSchema({
        yearStart: {
            in: ['body'],
            isNumeric: true,
        },
        yearEnd: {
            in: ['body'],
            isNumeric: true,
        },
    }),
    checkError,
    async (req, res) => {
        try {
            const { yearStart, yearEnd } = req.body;
            const count = await getCountMoviesBetweenDate(yearStart, yearEnd);
            return res.status(200).send(count);
        } catch (e) {
            return res.status(500).send(e.message);
        }
    }
);

module.exports = other;