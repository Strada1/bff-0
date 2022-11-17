const categoryModel = require("../models/category");

module.exports = {
    createNewCategory: async (req, res, next) => {
        try {
            const category = await categoryModel.create(req.body);
            return res.status(201).send({code: 201, message: "add categories", category});
        } catch (err) {
            console.log(err);
            if (err.name === "ValidationError") {
                return res.status(422).send(err.message);
            }
            next(err);
        }
    }
};
