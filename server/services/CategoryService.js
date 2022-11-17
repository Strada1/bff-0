const Category = require('../models/Category');

class CategoryService {
  async createCategory({ category }) {
    return Category.create({ category });
  }
}

module.exports = new CategoryService();
