const {default: mongoose} = require("mongoose");
const directorService = require("../Service/directorService");
const DirectorModel = require("../models/director");

module.exports = {
    getAllDirector: async (req, res) => {
        const director = await directorService.getAllDirector();
        res.send(director);
    },

    findDirectorById: async (req, res) => {
        try {
            const id = req.params.id;
            const director = await directorService.findDirectorById(id);

            if (!director) {
                return res.status(404).send("Director does not exist");
            }

            return res.status(200).send(director);
        } catch (err) {
            console.log(err.message);
            if (err instanceof mongoose.CastError) {
                return res.status(400).send("Invalid Director Id");
            }
            next(err);
        }
    },

    createNewDirector: async (req, res, next) => {
        try {
            const director = await directorService.createNewDirector(req.body);
            return res.status(201).send({code: 201, message: "add director", director});
        } catch (err) {
            console.log(err);
            if (err.name === "ValidationError") {
                return res.status(422).send(err.message);
            }
            next(err);
        }
    },

    updateDirector: async (req, res, next) => {
        try {
            const id = req.params.id;
            const updates = req.body;
            const options = {new: true};

            const director = await directorService.updateDirector(id, updates, options);
            if (!director) {
                return res.status(404).send("Director does not exist");
            }

            return res.status(200).send(director);
        } catch (err) {
            console.log(err.message);
            if (err instanceof mongoose.CastError) {
                return res.status(400).send("Invalid Director Id");
            }
            next(err);
        }
    },

    deleteDirector: async (req, res, next) => {
        try {
            const id = req.params.id;

            // const category = categoryService.deleteCategory(id);
            // не работает обработка ошибок с сервисом при удалении

            const director = await DirectorModel.findByIdAndDelete(id);
            console.log({director});
            if (!director) {
                return res.status(404).send("Director does not exist");
            }

            return res.status(200).send("director deleted successfully");
        } catch (err) {
            console.log(err.message);
            if (err instanceof mongoose.CastError) {
                return res.status(400).send("Invalid Director Id");
            }
            next(err);
        }
    }
};
