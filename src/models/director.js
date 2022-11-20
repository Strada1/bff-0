const { mongoose } = require('../db');

const DirectorSchema = new mongoose.Schema({
  name: String,
  surname: String,
  age: Number,
});

const Director = mongoose.model('Director', DirectorSchema);

module.exports = { Director };
