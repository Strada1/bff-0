const Movie = require('../models/MovieSchema');

const createMovie = ({ title, year, director, rating, category, comments = [] }) => {
    return Movie.create({ title, year, director, rating, category, comments });
}

const findMovies = () => {
    return Movie.find()
        .populate('director')
        .populate('category')
        .populate('comments');
}

const findByIdMovie = (id) => {
    return Movie.findById(id)
        .populate('director')
        .populate('category')
        .populate('comments');
}

const updateMovie = ({ id, ...updates }) => {
    return Movie.findByIdAndUpdate(id, {...updates}, { new: true, rawResult: true });
}

const deleteMovie = ({ id }) => {
    return Movie.findByIdAndDelete(id);
}

module.exports = {
    createMovie, findMovies, findByIdMovie, updateMovie, deleteMovie
}