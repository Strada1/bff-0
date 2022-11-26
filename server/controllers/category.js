import * as CategoryService from '../services/category.js';

export async function createCategory(req, res) {
  try {
    const { title } = req.body;
    const { movieId } = req.query;

    const category = await CategoryService.createCategory(title);

    if (movieId) {
      await CategoryService.addCategory(category._id, movieId);
    }

    return res.status(201).send(category);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function getCategory(req, res) {
  try {
    const { categoryId } = req.params;
    const category = await CategoryService.getCategory(categoryId);

    if (!category) {
      return res.status(404).send('No category for this ID');
    }

    return res.status(200).send(category);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function getCategories(req, res) {
  try {
    const { sort } = req.query;
    const categories = await CategoryService.getCategories(sort);

    return res.status(200).send(categories);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function updateCategory(req, res) {
  try {
    const { categoryId } = req.params;
    const { title } = req.body;
    const updatedCategory = await CategoryService.updateCategory(categoryId, title);

    if (!updatedCategory) {
      return res.status(404).send('No category for this ID');
    }

    return res.status(200).send(updatedCategory);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function deleteCategory(req, res) {
  try {
    const { categoryId } = req.params;
    const deletedCategory = await CategoryService.deleteCategory(categoryId);

    if (!deletedCategory) {
      return res.status(404).send('No category for this ID');
    }

    const { movieId } = req.query;

    if (movieId) {
      await CategoryService.pullCategory(categoryId, movieId);
    } else {
      await CategoryService.pullCategories(categoryId);
    }

    return res.status(200).send(deletedCategory);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
