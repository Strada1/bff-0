const mongoose = require('mongoose'); // ОДМ (Объектное Моделирование Данных)

const MovieSchema = new mongoose.Schema({ // определяем схему
  title: {
    type: String,
    required: true,
  },
  category: { type: 'ObjectId', ref: 'Category' },
  year: Number,
  duration: Number,
  director: String,
});

module.exports = mongoose.model('Movie', MovieSchema); // создаем модель по схеме
