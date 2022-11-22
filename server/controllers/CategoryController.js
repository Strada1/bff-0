const CategoryService = require('../services/CategoryService');
const MovieService = require('../services/MovieService');
const { getGeneratedResponse } = require('../utils');

class CategoryController {
  async createCategory(req, res) {
    try {
      const { movieId } = req.params;
      const movie = await MovieService.getMovie(movieId);

      if (!movie) {
        return res.status(404).send(getGeneratedResponse(false, movie, {
          message: 'No movie for this id',
        }));
      }

      const category = await CategoryService.createCategory(req.body);

      movie.categories.push(category._id);
      await movie.save();

      return res.status(201).send(getGeneratedResponse(true, category));
    } catch (err) {
      console.log('Error: ', err.message);
      return res.status(500).send(err.message);
    }
  }

  async getCategories(req, res) {
    try {
      const categories = await CategoryService.getCategories();

      return res.status(200).send(getGeneratedResponse(true, categories));
    } catch (err) {
      console.log('Error: ', err.message);
      return res.status(500).send(err.message);
    }
  }

  async updateCategory(req, res) {
    try {
      const { categoryId } = req.params;
      const category = await CategoryService.updateCategory(categoryId, req.body);

      if (!category) {
        return res.status(404).send(getGeneratedResponse(false, category, {
          message: 'No category for this id',
        }));
      }

      return res.status(200).send(getGeneratedResponse(true, category));
    } catch (err) {
      console.log('Error: ', err.message);
      return res.status(500).send(err.message);
    }
  }

  async deleteCategory(req, res) {
    try {
      const { categoryId } = req.params;
      const category = await CategoryService.deleteCategory(categoryId);

      if (!category) {
        return res.status(404).send(getGeneratedResponse(false, category, {
          message: 'No category for this id',
        }));
      }

      return res.status(200).send(getGeneratedResponse(true, category));
    } catch (err) {
      console.log('Error: ', err.message);
      return res.status(500).send(err.message);
    }
  }

}

module.exports = new CategoryController();