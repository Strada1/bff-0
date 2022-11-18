const { categoryService } = require('../services');

class Controller {
  create = async ( req, res ) => {
    const newCategory = req.body;
    const category = await categoryService.create(newCategory);

    return res.status(201).send(category);
  };
}

const categoryController = new Controller();

module.exports = { categoryController };
