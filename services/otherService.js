const Director = require("../models/DirectorSchema");
const Movie = require('../models/MovieSchema');
const {ObjectId} = require("mongodb");

const getCountMoviesByDirectors = (id) => {
    return Movie.aggregate([
        {
            $match: { director: new ObjectId(id) },
        },
        {
            $group: {
                _id: "$director",
                requestsCount: {
                    $count: { }
                }
            }
        }
    ]).exec();
}

const getCountMoviesBetweenDate = (yearStart, yearEnd) => {
    return Movie.aggregate([
        {
            $match: { year: { $gt: yearStart, $lt: yearEnd } },
        },
        {
            $group: {
                _id: "$year",
                requestsCount: {
                    $count: { }
                }
            }
        }
    ]).exec();
}

module.exports = {
    getCountMoviesByDirectors, getCountMoviesBetweenDate
}