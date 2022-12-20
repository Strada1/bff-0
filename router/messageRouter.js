const Router = require('express');
const {checkSchema} = require("express-validator");
const {ObjectId} = require("mongodb");
const checkIsMemberChat = require("../middlewares/checkIsMemberChat");
const checkError = require("../middlewares/checkErrors");
const {authorization} = require("../middlewares/passport");
const getTokenHeaders = require("../helpers/getTokenHeaders");
const {getByTokenUserService} = require("../service/userService");
const {createMessageService, getInChatMessageService} = require("../service/messageService");

const messages = new Router();

messages.get(
    '/chat/:chatId/message',
    authorization(),
    checkSchema({
        chatId: {
            in: ['params'],
            isMongoId: true,
        },
    }),
    checkError,
    checkIsMemberChat,
    async (req, res) => {
        try {
            const { chatId } = req.params;
            const messages = await getInChatMessageService(chatId);
            return res.status(200).send(messages);
        } catch (e) {
            return res.status(500).send(e.message);
        }
    }
)

messages.post(
    '/chat/:chatId/message',
    authorization(),
    checkSchema({
        chatId: {
            in: ['params'],
            isMongoId: true,
        },
        text: {
            in: ['body'],
            isString: true,
            isLength: {
                errorMessage: 'title should be at least 1 chars long',
                options: { min: 1 },
            },
        },
    }),
    checkError,
    checkIsMemberChat,
    async (req, res) => {
        try {
            const token = getTokenHeaders(req);
            const user = await getByTokenUserService(token);
            const { text } = req.body;
            const { chatId } = req.params;
            const messages = await createMessageService({ text, userId: ObjectId(user._id), chatId: ObjectId(chatId) });
            return res.status(201).send(messages);
        } catch (e) {
            return res.status(500).send(e.message);
        }
    }
)

module.exports = messages;