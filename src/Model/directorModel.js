const mongoose = require('mongoose');

const DrectorSchema = new mongoose.Schema({ // определяем схему
    name: String,
    age: Number,
  });
  const  DrectorModel = mongoose.model('Director',  DrectorSchema); // создаем модель по схеме

  module.exports =  DrectorModel;