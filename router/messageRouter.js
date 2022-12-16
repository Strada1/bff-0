const Router = require('express');
const {checkSchema} = require("express-validator");
const {ObjectId} = require("mongodb");
const checkIsMemberChat = require("../middlewares/checkIsMemberChat");
const checkError = require("../middlewares/checkErrors");
const {authorization} = require("../middlewares/passport");

const messages = new Router();

//TODO: isMemberChat function

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
            const token = req.headers.authorization;
            const user = await getByTokenUserService(token);
            const { text } = req.body;

            const messages = await createMessageService({ text, userId: ObjectId(user._id) });
            return res.status(200).send(messages);
        } catch (e) {
            return res.status(500).send(e.message);
        }
    }
)

module.exports = messages;