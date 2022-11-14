const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema(
  {
    category: String,
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('Category', CategorySchema); // создаем модель по схеме
