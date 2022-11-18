const DirectorModel = require("../models/director");

module.exports = {
    getAllDirector: async () => {
        const director = await DirectorModel.find({});
        return director;
    },

    findDirectorById: async id => {
        const director = await DirectorModel.findById(id);
        return director;
    },

    createNewDirector: async body => {
        const director = new DirectorModel(body);
        const result = await director.save();
        return result;
    },

    updateDirector: async (id, updates, options) => {
        const director = await DirectorModel.findByIdAndUpdate(id, updates, options);
        return director;
    },

    deleteDirector: async id => {
        const director = await DirectorModel.findByIdAndDelete(id);
        return director;
    }
};
