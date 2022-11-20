const { categoryService } = require('../services');

class Controller {
  create = async ( req, res ) => {
    const newCategory = req.body;
    const category = await categoryService.create(newCategory);

    return res.status(201).send(category);
  };
  get = async ( req, res ) => {
    const categories = await categoryService.get();

    return res.status(200).send(categories);
  };
  getOne = async ( req, res ) => {
    const { categoryId } = req.body;
    const category = await categoryService.getOne(categoryId);

    return res.status(200).send(category);
  };
  update = async ( req, res ) => {
    const { categoryId } = req.params;
    const newCategory = req.body;
    const category = await categoryService.update(categoryId, newCategory);

    return res.status(200).send(category);
  };
  delete = async ( req, res ) => {
    const { categoryId } = req.params;
    await categoryService.delete(categoryId);

    return res.status(200).send();
  };
}

const categoryController = new Controller();

module.exports = { categoryController };
