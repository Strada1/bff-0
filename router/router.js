const directors = require("./director");
const comments = require("./comments");
const categories = require("./categories");
const Router = require("express");
const movies = require("./movies");
const test = require("./test");

const router = new Router();

router.use(directors);
router.use(comments);
router.use(movies);
router.use(categories);

router.use(test);

module.exports = { router };