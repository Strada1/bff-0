const mongoose = require('mongoose');

const DirectorSchema = new mongoose.Schema({
  fullName: String,
});

module.exports = mongoose.model('Director', DirectorSchema);
