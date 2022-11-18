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

const addComment = (movieId, comment) => {
    return Movie.updateOne(
        { _id: movieId },
        { $push: { comments: comment } },
        { new: true }
    )
}

const deleteComment = (movieId, commentId) => {
    return Movie.updateOne(
        { _id: movieId },
        { $pull: { comments: commentId } },
        { new: true }
    )
}

const updateComment = (movieId, commentId, text) => {
    console.log(text)
    return Movie.updateOne(
        { _id: movieId, 'comments._id': commentId },
        { set: { 'comments.$': text } },
        { new: true }
    )
}

module.exports = {
    getMovies,
    getMovie,
    createMovie,
    deleteMovie,
    updateMovie,
    addComment,
    deleteComment,
    updateComment,
}
