const Router = require("express");
const users = require("./userRouter");
const chats = require("./chatRouter");
const messages = require("./messageRouter");

const router = new Router();

router.use(users);
router.use(chats);
router.use(messages);

module.exports = router;