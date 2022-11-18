const { createCategory } = require('../services/categoryServices');
const { getGeneratedResponse } = require('../utils');

async function createCategoryHandler(req, res) {
  try {
    const category = await createCategory(req.body);

    return res.status(201).send(
      getGeneratedResponse(true, category)
    );
  } catch (err) {
    console.log('Error: ', err.message);
    return res.status(500).send(err.message);
  }
}

module.exports = {
  createCategoryHandler,
};
