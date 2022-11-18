const commentService = require("../Service/commentService");

module.exports = {
    createNewComment: async (req, res, next) => {
        try {
            const movieId = req.params.movieId; // подозреваю, что нужно будет делать проверку на существование id фильма
            console.log(movieId);
            console.log(req.body);
            const comment = await commentService.createNewComment(req.body);
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
