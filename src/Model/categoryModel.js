const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({ // определяем схему
    title: String,
 
  });
  const  CategoryModel = mongoose.model('Category',  CategorySchema); // создаем модель по схеме

  module.exports =  CategoryModel;