const commentModel = require("../models/comment");

module.exports = {
    createNewComment: async (req, res, next) => {
        try {
            const comment = await commentModel.create(req.body);
            return res.status(201).send({code: 201, message: "add comment", comment});
        } catch (err) {
            console.log(err);
            if (err.name === "ValidationError") {
                return res.status(422).send(err.message);
            }
            next(err);
        }
    }
};
