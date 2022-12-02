const fs = require("node:fs/promises");
const MovieModel = require("../models/movie");

const validate = (movie, fields) => {
    const result = [];
    fields.forEach(field => {
        if (!movie[field] && movie[field] !== 0) {
            result.push(field);
        }
    });
    return result;
};

const readFile = async () => {
    try {
        const uploadMovies = [];
        const file = await fs.readFile("../movies.json", {encoding: "utf8"});
        if (file.length === 0) console.log("В файле нет данных");
        // console.log(file);
        const movies = JSON.parse(file);
        movies.forEach(movie => {
            const errors = validate(movie, ["title", "category"]);
            if (errors.length > 0) {
                console.log(`Movies cannot be downloaded, not found fields ${errors} in file '\n'`, movie);
                return;
            }
            uploadMovies.push(movie);
        });
        const result = await MovieModel.insertMany(uploadMovies);
        return result;
    } catch (error) {
        console.log(error);
    }
};

readFile();
