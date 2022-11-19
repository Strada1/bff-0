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
    director: {type: 'ObjectId', ref: 'Director'},
})

const Movie = mongoose.model('Movie', MovieSchema)

const CommentsSchema = new mongoose.Schema({
    film: {type: 'ObjectId', ref: 'Movie'},
    author: String,
    text: String,
})

const Comments = mongoose.model('Comments', CommentsSchema)

const DirectorSchema = new mongoose.Schema({
    name: String,
    age: Number,
})

const Director = mongoose.model('Director', DirectorSchema)

module.exports = {Category, Movie, Comments, Director}