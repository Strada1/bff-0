const Director = require('../models/Director')
const Movie = require('../models/Movie')
const { ObjectId } = require('mongodb')

const getDirectorMoviesCount = (directorId) => {
    return Director.aggregate([
        {
            $match: {
                _id: new ObjectId(directorId)
            }
        },
        {
            $group: {
                _id: directorId,
                moviesCount: {
                    $sum: {
                        $size: '$movies'
                    }
                }
            }
        }
    ])
}

const getMoviesBetweenYears = (gt, lt) => {
    return Movie.aggregate(
        [
            {
                $match: {
                    year: {
                        $gt: gt,
                        $lt: lt
                    }
                }
            },
            {
                $count: 'movies_count'
            }
        ]
    )
}

module.exports = { getDirectorMoviesCount, getMoviesBetweenYears }