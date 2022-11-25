const fs = require('node:fs/promises');
const { createManyMovies } = require("../services/movieService");

function checkMovie(movie, parameter) {
    const errors = []
    parameter.forEach((item) => {
        if (!movie[item]) {
            errors.push(`${item} is not valid`);
        }
    })
    return errors;
}

async function readerFS(path) {
    const file = await fs.readFile(path, {encoding: 'utf8'});
    const movies = JSON.parse(file);

    const validMovies = [];
    movies.forEach((item, index, array) => {
        const error = checkMovie(item, ['title', 'year', 'rating', 'director', 'category']);
        if (error.length === 0) {
            let { title, year, director, rating, category } = item;
            director = director['$oid'];
            category = category['$oid'];
            validMovies.push({ title, year, director, rating, category });
        }
    })

    const result = createManyMovies(validMovies);
}

module.exports = readerFS;