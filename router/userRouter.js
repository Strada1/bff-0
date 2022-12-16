const Router = require('express');
const {checkSchema} = require("express-validator");
const isEmptyObject = require("../helpers/isEmptyObject");
const checkError = require("../middlewares/checkErrors");
const {authorization} = require("../middlewares/passport");

const users = new Router();

users.get(
    '/users',
    authorization(),
    async (req, res) => {
        try {
            const users = await getUsersService();
            return res.status(200).send(users);
        } catch (e) {
            return res.status(500).send(e.message);
        }
    });

users.get(
    '/users/me',
    authorization(),
    async (req, res) => {
        try {
            const token = req.headers.authorization;
            const [user] = await getByTokenUserService(token);
            return res.status(200).send(user);
        } catch (e) {
            return res.status(500).send(e.message);
        }
    });

users.get(
    '/users/:userId',
    authorization(),
    checkSchema({
        userId: {
            in: ['params'],
            isMongoId: true,
        },
    }),
    checkError,
    async (req, res) => {
        try {
            const { userId } = req.params;
            const user = await getByIdUserService(userId);
            if (isEmptyObject(user)) {
                return res.status(404).send('user not found');
            }
            return res.status(200).send(user);
        } catch (e) {
            return res.status(500).send(e.message);
        }
    })

users.post(
    '/users',
    checkSchema({
        email: {
            in: ['body'],
            isEmail: true,
        },
        username: {
            in: ['body'],
            isString: true,
            isLength: {
                errorMessage: 'Username should be at least 1 chars long',
                options: { min: 1 },
            },
        },
        password: {
            in: ['body'],
            isString: true,
            isLength: {
                errorMessage: 'Password should be at least 8 chars long',
                options: { min: 8 },
            },
        },
    }),
    checkError,
    async (req, res) => {
        try {
            const { email, password } = req.body;
            const token = await generateToken({ email, password });

            const user = await createUserService({ token, email, password, username: req.body.username});
            if (isEmptyObject(user)) {
                return res.status(409).send('this email is already in use');
            }
            return res.status(201).send(user);
        } catch (e) {
            return res.status(500).send(e.message);
        }
    });

//TODO: разбить на несколько?
users.put(
    '/users/:userId',
    authorization(['admin']),
    checkSchema({
        userId: {
            in: ['params'],
            isMongoId: true,
        },
        email: {
            in: ['body'],
            isEmail: true,
        },
        username: {
            in: ['body'],
            isString: true,
            isLength: {
                errorMessage: 'Username should be at least 1 chars long',
                options: { min: 1 },
            },
        },
        chats: {
            //TODO: element is object id
            isArray: true,
        },
        password: {
            in: ['body'],
            isString: true,
            isLength: {
                errorMessage: 'Password should be at least 8 chars long',
                options: { min: 8 },
            },
        },
    }),
    checkError,
    async (req, res) => {
        try {
            const { userId } = req.params;
            const user = await updateUserService({ userId, ...req.body });
            return res.status(200).send(user);
        } catch (e) {
            return res.status(500).send(e.message);
        }
    })

users.delete(
    '/users/:userId',
    authorization(['admin']),
    checkSchema({
        userId: {
            in: ['params'],
            isMongoId: true,
        },
    }),
    checkError,
    async (req, res) => {
        try {
            const { userId } = req.params;
            await deleteUserService(userId);
            return res.status(200).send('delete');
        } catch (e) {
            return res.status(500).send(e.message);
        }
    });

module.exports = users;