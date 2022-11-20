const { Category } = require('../models');

class Service {
  create = ( { title } ) => {
    return Category.create({ title });
  };
  get = () => {
    return Category.find();
  };
  getOne = ( categoryId ) => {
    return Category.findById(categoryId);
  };
  update = ( categoryId, { title } ) => {
    return Category.findByIdAndUpdate(
      categoryId,
      { title },
    );
  };
  delete = ( categoryId ) => {
    return Category.findByIdAndDelete(categoryId);
  };
}

const categoryService = new Service();

module.exports = { categoryService };
