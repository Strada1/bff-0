const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    title: String,
})

const Category = mongoose.model('Category', CategorySchema)

const MovieSchema = new mongoose.Schema({
    title: String,
    category: {type: 'ObjectId', ref: 'Category'},
    year: Number,
    duration: String,
    director: String,
})

const Movie = mongoose.model('Movie', MovieSchema)

const CommentsSchema = new mongoose.Schema({
    filmId: String,
    author: String,
    text: String,
})

const Comments = mongoose.model('Comments', CommentsSchema)

module.exports = {Category, Movie, Comments}