const mongoose = require('mongoose');

const DirectorSchema = new mongoose.Schema({
    name: String,
    firstname: String,
});

module.exports = mongoose.model('Director', DirectorSchema);