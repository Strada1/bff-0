const mongoose = require('../db');
const { ObjectId } = require('mongodb');

const DirectorSchema = new mongoose.Schema(
  {
    fullName: String,
    birthday: Date,
    movies: [{ type: ObjectId, ref: 'Movie' }],
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('Director', DirectorSchema);
