const Category = require('../models/Category');

class CategoryService {
  createCategory({ category }) {
    return Category.create({ category });
  }

  getCategories() {
    return Category.find();
  }

  updateCategory(id, updatedFields) {
    return Category.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });
  }

  deleteCategory(id) {
    return Category.findByIdAndDelete(id);
  }
}

module.exports = new CategoryService();
