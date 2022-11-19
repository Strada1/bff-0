const mongoose = require('mongoose');
const { Schema } = mongoose;

const DirectorSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model('Director', DirectorSchema);
