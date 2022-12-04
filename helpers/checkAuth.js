const {getUsers} = require("../services/userService");

async function checkAuth(req, res, next) {
    const token = req.headers.authorization;
    const [user] = await getUsers({ token });

    const hasNotUser = !user;
    if (hasNotUser) {
        return res.status(401).send('Unauthorized');
    }
    next();
}

module.exports = { checkAuth };