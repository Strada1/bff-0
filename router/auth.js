const Router = require('express');
const {checkSchema} = require("express-validator");

const checkError = require("../helpers/checkError");
const { getUsers } = require("../services/userService");
const {decodeToken} = require("../helpers/token");

const auth = new Router();

auth.post(
    '/auth',
    checkSchema({
        email: {
            in: ['body'],
            isEmail: true,
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
            const errorMessage = 'email or password is wrong';
            const { email, password } = req.body;
            const [ user ] = await getUsers({ email });

            const hasNotUser = !user;
            if (hasNotUser) {
                return res.status(400).send(errorMessage);
            }
            const { token } = user;
            const decode = await decodeToken(token);

            const isWrongPassword = password !== decode.password;
            if (isWrongPassword) {
                return res.status(400).send(errorMessage);
            }
            return res.status(200).send(user.token);
        } catch (e) {
            return res.status(500).send(e.message);
        }
    });


module.exports = auth;