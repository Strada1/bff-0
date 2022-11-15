import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'
import { Categories } from '../categories/categories'

export const MoviesSchema =  new mongoose.Schema({
    title: String,
    category: { type: ObjectId, ref: Categories.modelName },
    duration: Number,
    director: String,
    year: Number,
    rating: Number,
})


export const Movie = mongoose.model('Movie', MoviesSchema)