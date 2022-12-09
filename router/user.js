const Router = require('express');
const {checkSchema} = require("express-validator");
const _ = require('lodash');

const checkError = require("../helpers/checkError");
const { createUser, getUsers, updateUser, deleteUser, getByIdUser } = require("../services/userService");
const {generateToken} = require("../helpers/token");
const { passportAuth, passportRole } = require("../helpers/passportAuth");
const {getFavoritesStatistic} = require("../services/statisticService");
const {ObjectId} = require("mongodb");

const users = new Router();

users.get(
    '/users',
    passportAuth,
    async (req, res) => {
        try {
            const user = await getUsers();
            return res.status(200).send(user);
        } catch (e) {
            return res.status(500).send(e.message);
        }
    });

users.get(
    '/users/me',
    passportAuth,
    async (req, res) => {
        try {
            const token = req.headers.authorization;
            const [user] = await getUsers({ token });
            return res.status(200).send(user);
        } catch (e) {
            return res.status(500).send(e.message);
        }
    });

users.get(
    '/users/:userId',
    // passportAuth,
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
            const user = await getByIdUser(userId);
            const isEmpty = _.isEmpty(user);
            if (isEmpty) {
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

            const user = await createUser({ token, ...req.body});
            const isEmpty = _.isEmpty(user);
            if (isEmpty) {
                return res.status(409).send('this login is already in use');
            }
            return res.status(201).send(user);
        } catch (e) {
            return res.status(500).send(e.message);
        }
    });

users.put(
    '/users/:userId',
    passportAuth,
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
        roles: {
            isArray: true,
        },
        favorites: {
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
            const user = await updateUser({ userId, ...req.body });
            return res.status(200).send(user);
        } catch (e) {
            return res.status(500).send(e.message);
        }
    })

users.delete(
    '/users/:userId',
    passportAuth,
    passportRole('user'),
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
            await deleteUser(userId);
            return res.status(200).send('delete');
        } catch (e) {
            return res.status(500).send(e.message);
        }
    });

users.put(
    '/users/:userId/favorites/:movieId',
    // passportAuth,
    checkSchema({
        userId: {
            in: ['params'],
            isMongoId: true,
        },
        movieId: {
            in: ['params'],
            isMongoId: true,
        },
    }),
    checkError,
    async (req, res) => {
        try {
            const { userId, movieId } = req.params;

            const user = await getByIdUser(userId);
            const { favorites } = user;

            const hasInFavorites = favorites.includes(ObjectId(movieId));
            if (!hasInFavorites) {
                favorites.push(ObjectId(movieId));
                await updateUser({ userId, ...user, favorites });
                return res.status(200).send(favorites)
            } else {
                return res.status(409).send('the movie is already in favorites');
            }
        } catch (e) {
            return res.status(500).send(e.message);
        }
    })

users.delete(
    '/users/:userId/favorites/:movieId',
    // passportAuth,
    checkSchema({
        userId: {
            in: ['params'],
            isMongoId: true,
        },
        movieId: {
            in: ['params'],
            isMongoId: true,
        },
    }),
    checkError,
    async (req, res) => {
        try {
            const { userId, movieId } = req.params;

            const user = await getByIdUser(userId);
            const { favorites } = user;

            const hasInFavorites = favorites.includes(ObjectId(movieId));
            if (hasInFavorites) {
                const result = favorites.filter((item) => (item.toString() !== movieId));
                await updateUser({ userId, ...user, favorites: result });
                return res.status(200).send(result);
            } else {
                return res.status(400).send('the movie ');
            }
        } catch (e) {
            return res.status(500).send(e.message);
        }
    })



users.get(
    '/info/statistic/favorites',
    async (req, res) => {
        try {
            const statistic = await getFavoritesStatistic();
            return res.status(200).send(statistic);
        } catch (e) {
            return res.status(500).send(e.message);
        }
    })
module.exports = users;