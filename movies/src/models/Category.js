const mongoose = require('../db');
const { ObjectId } = require('mongodb');

const CategorySchema = new mongoose.Schema(
  {
    name: String,
    movies: [{ type: ObjectId, ref: 'Movie' }],
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('Category', CategorySchema);
