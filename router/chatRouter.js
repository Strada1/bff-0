const Router = require('express');
const {checkSchema} = require("express-validator");
const {ObjectId} = require("mongodb");
const {authorization} = require("../middlewares/passport");
const checkError = require("../middlewares/checkErrors");

const chats = new Router();

//TODO: getByTokenUserService

chats.get(
    '/chats',
    authorization(),
    async (req, res) => {
        try {
            const token = req.headers.authorization;
            const [user] = await getUsersService({ token });
            const { chats } = user;
            return res.status(200).send(chats);
        } catch (e) {
            return res.status(500).send(e.message);
        }
    });

chats.post(
    '/chats',
    authorization(),
    checkSchema({
        title: {
            in: ['body'],
            isString: true,
            isLength: {
                errorMessage: 'title should be at least 1 chars long',
                options: { min: 1 },
            },
        },
    }),
    checkError,
    async (req, res) => {
        try {
            const token = req.headers.authorization;
            const [ user ] = await getUsersService({ token });
            const { title } = req.body;
            const { chats } = user;

            const newChat = await createChatService({ title, users: [ ObjectId(user._id) ] });
            chats.push(ObjectId(newChat._id));
            const updatedUser = await updateUserService({ userId: user._id, ...user, chats });

            return res.status(201).send(newChat);
        } catch (e) {
            return res.status(500).send(e.message);
        }
    });

chats.put(
    '/chats/:chatId',
    authorization(['admin']),
    checkSchema({
        chatId: {
            in: ['params'],
            isMongoId: true,
        },
        title: {
            in: ['body'],
            isString: true,
            isLength: {
                errorMessage: 'title should be at least 1 chars long',
                options: { min: 1 },
            },
        },
        users: {
            isArray: true,
        },
    }),
    checkError,
    async (req, res) => {
        try {
            const token = req.headers.authorization;
            const [ user ] = await getUsersService({ token });
            const { chatId } = req.params;
            const chat = await getByIdChatService(chatId);

            const isMemberChat = chat.users.includes(ObjectId(user._id));
            if (isMemberChat) {
                const chat = await updateChatService({ chatId, ...req.body });
                return res.status(200).send(chat);
            }
            return res.status(403).send('Forbidden');
        } catch (e) {
            return res.status(500).send(e.message);
        }
    })

chats.delete(
    '/chats/:chatId',
    authorization(['admin']),
    checkSchema({
        chatId: {
            in: ['params'],
            isMongoId: true,
        },
    }),
    checkError,
    async (req, res) => {
        try {
            const token = req.headers.authorization;
            const [ user ] = await getUsersService({ token });
            const { chatId } = req.params;
            const chat = await getByIdChatService(chatId);

            const isMemberChat = chat.users.includes(ObjectId(user._id));
            if (isMemberChat) {
                const chat = await deleteChatService({ chatId, ...req.body });
                return res.status(200).send('this chat has been deleted');
            }
            return res.status(403).send('Forbidden');
        } catch (e) {
            return res.status(500).send(e.message);
        }
    })

module.exports = chats;