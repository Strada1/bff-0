import mongoose from 'mongoose'

export const MoviesSchema =  new mongoose.Schema({ // определяем схему
    title: String,
    category: String,
    duration: Number,
    director: String,
    year: Number,
    rating: Number,
})


export const Movie = mongoose.model('Movie', MoviesSchema)