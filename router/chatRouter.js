const Router = require('express');
const {checkSchema} = require("express-validator");
const {ObjectId} = require("mongodb");
const {authorization} = require("../middlewares/passport");
const checkError = require("../middlewares/checkErrors");
const checkIsMemberChat = require("../middlewares/checkIsMemberChat");
const {deleteChatService, updateChatService, createChatService, getByIdChatService} = require("../service/chatService");
const {updateUserService, getByTokenUserService} = require("../service/userService");
const getTokenHeaders = require("../helpers/getTokenHeaders");
const {getByIdChatFixture} = require("../tests/fixture/chatFixture");

const chats = new Router();

chats.get(
    '/chats',
    authorization(),
    async (req, res) => {
        try {
            const token = req.headers.authorization;
            const user = await getByTokenUserService(token);
            const { chats } = user;
            return res.status(200).send(chats);
        } catch (e) {
            return res.status(500).send(e.message);
        }
    });

chats.get(
    '/chats/:chatId',
    authorization(),
    async (req, res) => {
        try {
            const { chatId } = req.params
            const chat = await getByIdChatService(chatId)
            return res.status(200).send(chat);
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
            const token = getTokenHeaders(req);
            const user = await getByTokenUserService(token);
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
    authorization(),
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
    checkIsMemberChat,
    async (req, res) => {
        try {
            const { chatId } = req.params;
            const chat = await updateChatService({ chatId, ...req.body });
            return res.status(200).send(chat);
        } catch (e) {
            return res.status(500).send(e.message);
        }
    })

chats.delete(
    '/chats/:chatId',
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
            const token = getTokenHeaders(req);
            const user = await getByTokenUserService(token);
            const { chatId } = req.params;
            const chat = await deleteChatService(chatId);
            const chats = user.chats.filter((item) => item.toString() !== chatId);
            const updatedUser = await updateUserService({ userId: user._id, ...user, chats });
            return res.status(200).send('this chat has been deleted');
        } catch (e) {
            return res.status(500).send(e.message);
        }
    })

module.exports = chats;