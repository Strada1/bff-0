const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
 
  title: String,
  category:  {type: 'ObjectId', ref: 'Category'}, 
  year: Number,
  duration: Number,
  director: {type: 'ObjectId', ref: 'Director'},
});
const MovieModel = mongoose.model("Movie", MovieSchema); // создаем модель по схеме

module.exports = MovieModel;
