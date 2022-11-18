const MovieModel = require("../models/movie");

module.exports = {
    createNewMovie: async body => {
        const movie = new MovieModel(body);
        const result = await movie.save();
        return result;
    },

    findMovieById: async id => {
        const movie = await MovieModel.findById(id);
        return movie;
    },

    updateMovie: async (id, updates, options) => {
        const movie = await MovieModel.findByIdAndUpdate(id, updates, options);

        // здесь можно обработать ошибки, но позже (когда будем проходить)
        // if (!movie) {
        //     return res.status(404).send("Movie does not exist");
        // }

        return movie;
    },

    deleteMovie: async id => {
        const movie = await MovieModel.findByIdAndDelete(id);
        return movie;
    }
};
