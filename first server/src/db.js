const url = 'mongodb://127.0.0.1:27017/main'
const mongoose = require('mongoose')
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})

const CategorySchema = new mongoose.Schema({
    title: String,
})

const Category = mongoose.model('Category', CategorySchema)

const MovieSchema = new mongoose.Schema({
    title: String,
    category: String,
    year: Number,
    duration: String,
    director: String,
})

const Movie = mongoose.model('Movie', MovieSchema)

module.exports = {Category, Movie}