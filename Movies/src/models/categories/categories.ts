import mongoose from 'mongoose'

export const CategoriesSchema =  new mongoose.Schema({
    title: String
})

export const Categories = mongoose.model('Categories', CategoriesSchema)