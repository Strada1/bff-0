const { Category } = require('../models');

class Service {
  create = ( { title } ) => {
    return Category.create({ title });
  };
}

const categoryService = new Service();

module.exports = { categoryService };
