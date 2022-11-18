const { ObjectId } = require('mongodb')
const mongoose = require('../db')

const MovieSchema = new mongoose.Schema(
    {
        title: String,
        year: Number,
        duration: Number,
        category: {
            type: ObjectId,
            ref: 'Category',
        },
        director: {
            type: ObjectId,
            ref: 'Director',
        },
        comments: {
            type: ObjectId,
            ref: 'Comment',
        },
    },
    {
        versionKey: false,
    }
)

module.exports = mongoose.model('Movie', MovieSchema)
