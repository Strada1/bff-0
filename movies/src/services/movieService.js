const Movie = require('../models/Movie')

const getMovies = () => {
    return Movie.find()
        .lean().populate('category director comments')
}

const getMovie = (movieId) => {
    return Movie.findById({ _id: movieId }).populate('category director comments')
}

const createMovie = ({ title, year, duration, category }) => {
    return Movie.create({ title, year, duration, category })
}

const deleteMovie = (movieId) => {
    return Movie.findByIdAndDelete({ _id: movieId }).lean()
}

const updateMovie = (movieId, data) => {
    return Movie.findByIdAndUpdate({ _id: movieId }, data, { new: true }).lean()
}

const addCommentToMovie = (movieId, commentId) => {
    console.log(movieId, commentId)
    return Movie.findByIdAndUpdate(movieId, { $push: { comments: commentId } }).lean()
}

const deleteCommentFromMovie = (movieId, commentId) => {
    console.log(movieId, commentId)
    return Movie.findByIdAndUpdate(movieId, { $pull: { comments: commentId } }).lean()
}

module.exports = {
    getMovies,
    getMovie,
    createMovie,
    deleteMovie,
    updateMovie,
    addCommentToMovie,
    deleteCommentFromMovie
}
