const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    rating: Number,
    category: String,
});

movieModel = mongoose.model('Movie', MovieSchema);

module.exports = {movieModel};
