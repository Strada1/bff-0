const {getUsers} = require("../services/userService");
const checkRole = (role) => async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const [user] = await getUsers({token});

        const hasRole = user.roles.includes(role);
        if (!hasRole) {
            return res.status(403).send('Forbidden');
        }
        next();
    } catch (e) {
        return res.status(500).send(e.message);
    }
}

module.exports = checkRole;