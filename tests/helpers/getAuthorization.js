const {getTokenUserFixture} = require("../fixture/userFixture");

async function getAuthorization() {
    const token = await getTokenUserFixture();
    return {'Authorization' : `Bearer ${token}`}
}

module.exports = getAuthorization;