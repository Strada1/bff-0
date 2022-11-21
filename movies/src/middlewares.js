const validate = (requiredFields) => {
    return (req, res, next) => {
        let isValid = true
        for (const field of requiredFields) {
            if (!req.body[field]) {
                isValid = false
            }
        }
        if (!isValid) {
            return res.status(401).send('Validation is failed')
        }
        next()
    }
}

module.exports = { validate }