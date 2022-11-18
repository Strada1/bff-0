const Router = require("express").Router;
const router = new Router();

const DirectorController = require("../Controllers/director");

// получить список всех рижиссеров
router.get("/director", DirectorController.getAllDirector);

// найти рижиссера по id
router.get("/director/:id", DirectorController.findDirectorById);

// создать нового рижиссера
router.post("/director", DirectorController.createNewDirector);

// Изменить (обновить) рижиссера по id
router.put("/director/:id", DirectorController.updateDirector);

// удалить рижиссера по id
router.delete("/director/:id", DirectorController.deleteDirector);

module.exports = router;
