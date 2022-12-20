function getTokenHeaders(req) {
    return (req.headers.authorization).split(' ')[1]
}

module.exports = getTokenHeaders;