const Movie = require('../models/Movie')

const getMovies = () => {
    return Movie.find()
}

const getMovie = (movieId) => {
    return Movie.findById({ _id: movieId })
}

const createMovie = ({ title, year, duration, category, comments }) => {
    return Movie.create({ title, year, duration, category, comments })
}

const deleteMovie = (movieId) => {
    return Movie.findByIdAndDelete({ _id: movieId })
}

const updateMovie = (movieId, data) => {
    return Movie.findByIdAndUpdate({ _id: movieId }, data, { new: true })
}

module.exports = {
    getMovies,
    getMovie,
    createMovie,
    deleteMovie,
    updateMovie,
}
