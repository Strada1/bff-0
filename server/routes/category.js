const Router = require("express").Router;
const router = new Router();

const CategoryController = require("../Controllers/category");

// получить список всех категорий
router.get("/categories", CategoryController.getAllCategory);

// найти категорию по id
router.get("/category/:id", CategoryController.findCategoryById);

// создать новую категорию
router.post("/category", CategoryController.createNewCategory);

// Изменить (обновить) категорию по id
router.put("/category/:id", CategoryController.updateCategory);

// удалить категорию по id
router.delete("/category/:id", CategoryController.deleteCategory);

module.exports = router;
