const mongoose = require('../db')

const MovieSchema = new mongoose.Schema(
    {
        title: String,
        year: Number,
        duration: Number,
        category: {
            type: 'ObjectId',
            ref: 'Category'
        }
    },
    {
        versionKey: false,
    }
)

module.exports = mongoose.model('Movie', MovieSchema)
