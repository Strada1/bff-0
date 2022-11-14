const mongoose = require('../db')

const CategorySchema = new mongoose.Schema(
    {
        category: String,
    },
    {
        versionKey: false,
    }
)

module.exports = mongoose.model('Category', CategorySchema)
