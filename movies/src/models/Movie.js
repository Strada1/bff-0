const mongoose = require('../db')

const MovieSchema = new mongoose.Schema(
    {
        title: String,
        year: Number,
        duration: Number,
    },
    {
        versionKey: false,
    }
)

module.exports = mongoose.model('Movie', MovieSchema)
