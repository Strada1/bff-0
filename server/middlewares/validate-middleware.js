module.exports = array => {
    return (req, res, next) => {
        const result = [];

        for (const key in req.body) {
            if (array.includes(key)) result.push(key);
        }
        if (array.length === [...new Set(result)].length) {
            next();
        } else {
            const error = [];
            for (let i = 0; i < array.length; i++) {
                const el = array[i];
                if (!result.includes(el)) {
                    error.push(el);
                }
            }
            return res.status(422).send(`These fields are not present in the request body: ${error}`);
        }
    };
};
