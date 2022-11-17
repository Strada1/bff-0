const Router = require("express").Router;
const router = new Router();

const MovieController = require("../Controllers/movie");

// получить список всех фильмов
router.get("/movies", MovieController.getAllMovies);

// найти фильм по id
router.get("/movies/:id", MovieController.findMovieById);

// создать новый фильм
router.post("/movies", MovieController.createNewMovie);

// Изменить (обновить) фильм по id
router.put("/movies/:id", MovieController.updateMovie);

// удалить фильм по id
router.delete("/movies/:id", MovieController.deleteMovie);

module.exports = router;
