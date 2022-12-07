const directors = require("./director");
const comments = require("./comments");
const categories = require("./categories");
const Router = require("express");
const movies = require("./movies");
const test = require("./other");
const users = require("./user");
const auth = require("./auth");

const router = new Router();

router.use(directors);
router.use(comments);
router.use(movies);
router.use(categories);
router.use(users);
router.use(auth);

router.use(test);

module.exports = { router };