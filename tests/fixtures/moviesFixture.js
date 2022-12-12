const {getDirectors} = require("../../services/directorService");
const {getCategories} = require("../../services/categoriesService");
const {getMovies} = require("../../services/movieService");

async function getMovie({
                            errors = {},
                            exists = false,
                        } = {}) {
    if (exists) {
        return (await getMovies())[0];
    } else {
        const title = 'The Shawshank Redemption',
            year = errors.year ? '123u' : 1999,
            rating = 9.2,
            director = (await getDirectors())[0]._id.toString(),
            category = (await getCategories())[0]._id.toString();

        return {
            title,
            year,
            rating,
            description: title,
            director,
            category,
        };
    }
}

module.exports = { getMovie };