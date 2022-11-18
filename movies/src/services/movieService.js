const Movie = require('../models/Movie')

const getMovies = () => {
    return Movie.find()
}

const createMovie = ({ title, year, duration, category, comments }) => {
    return Movie.create({ title, year, duration, category, comments })
}

const deleteMovie = (id) => {
    return Movie.findByIdAndDelete(id)
}

const updateMovie = (id, data) => {
    return Movie.findByIdAndUpdate(id, data, { new: true })
}

const addCommentToMovie = (id, comment) => {
    return Movie.updateOne(id, { $push: { comments: comment } })
}

module.exports = {
    getMovies,
    createMovie,
    deleteMovie,
    updateMovie,
    addCommentToMovie,
}
