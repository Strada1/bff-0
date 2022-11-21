const mongoose = require('mongoose');
const CommentsSchema = new mongoose.Schema({
  idMovie: { type: 'ObjectId' },
  description: String,
});

module.exports = mongoose.model('Comments', CommentsSchema); // создаем модель по схеме
