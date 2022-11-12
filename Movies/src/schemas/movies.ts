import mongoose from 'mongoose'

export const Movies =  new mongoose.Schema({ // определяем схему
    title: String,
    category: String,
    duration: Number,
    director: String,
    year: Number,
    rating: Number,
})