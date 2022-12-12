const {getUsers, getByIdUser} = require("../../services/userService");

async function getUserFixture({ exists } = { exists: false }) {
    if (exists) {
        const { _id, email, username, roles, favorites } = (await getUsers())[0]
        return { _id, email, username, roles, favorites, password: 'wqe12f54w' };
    } else {
        return {
            email: 'string@test.ru',
            username: 'String',
            password: 'wqe12f54w'
        };
    }
}

function getByIdUserFixture(userId) {
    return getByIdUser(userId);
}

async function getUserFavoriteFixture({ userId } = {}) {
    if (userId) {
        const user = await getByIdUserFixture(userId);
        return user.favorites[0];
    } else {
        const user = await getUserFixture({exists: true});
        return user.favorites[0];
    }
}

module.exports = { getUserFixture, getByIdUserFixture, getUserFavoriteFixture };