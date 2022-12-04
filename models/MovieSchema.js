const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    rating: Number,
    description: String,
    director: { type: 'ObjectId', ref: 'Director' },
    category: { type: 'ObjectId', ref: 'Category' },
    comments: [{ type: 'ObjectId', ref: 'Comment'}]
});

module.exports = mongoose.model('Movie', MovieSchema);