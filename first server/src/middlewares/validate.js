function validate(values) {
    return function(req, res, next) {
        let isValid = true
        values.forEach(item => {
            if (req.body[item] === undefined) {
                isValid = false
            }
        })

        if (!isValid) {
            return res.status(200).send('all fields are not filled!')
        }

        next()
    }
}

module.exports = {validate}