const { Category } = require('../models');

class Controller {
  create = async ( req, res ) => {
    const categoryJSON = req.body;
    const category = await Category.create(categoryJSON);

    return res.status(201).send(category);
  };
}

const categoryController = new Controller();

module.exports = { categoryController };
