const Movie = require('../models/Movie')

const getMovies = () => {
    return Movie.find()
        .lean()
        .populate('category')
        .populate('director')
        .populate('comments')
}

const getMovie = (movieId) => {
    return Movie.findById({ _id: movieId })
        .populate('category')
        .populate('director')
        .populate('comments')
}

const createMovie = ({ title, year, duration, category, comments }) => {
    return Movie.create({ title, year, duration, category, comments })
}

const deleteMovie = (movieId) => {
    return Movie.findByIdAndDelete({ _id: movieId }).lean()
}

const updateMovie = (movieId, data) => {
    return Movie.findByIdAndUpdate({ _id: movieId }, data, { new: true }).lean()
}

module.exports = {
    getMovies,
    getMovie,
    createMovie,
    deleteMovie,
    updateMovie,
}
