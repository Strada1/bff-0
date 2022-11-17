const Router = require("express").Router;
const router = new Router();

const CategoryController = require("../Controllers/category");

// создать новую категорию
router.post("/categories", CategoryController.createNewCategory);

module.exports = router;
