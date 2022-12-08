const {getUsers} = require("../../services/userService");

async function getUser({ exists } = { exists: false }) {
    if (exists) {
        const { email, username } = (await getUsers())[0]
        return { email, username, password: 'wqe12f54w' };
    } else {
        return {
            email: 'string@test.ru',
            username: 'String',
            password: 'wqe12f54w'
        };
    }
}

module.exports = { getUser };