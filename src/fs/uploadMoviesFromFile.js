require('dotenv').config();
const Movie = require('../models/Movie');
const fs = require('node:fs/promises');

const validate = (movie, fields) => {
  const result = [];
  fields.forEach((field) => {
    if (!movie[field] && movie[field] !== 0) {
      result.push(field);
    }
  });
  return result;
};

const uploadMoviesFromFile = async (path) => {
  try {
    const upload = [];
    const file = await fs.readFile(path, { encoding: 'utf-8' });
    const movies = await JSON.parse(file);
    movies.forEach((movie) => {
      const errors = validate(movie, [
        'title',
        'category',
        'year',
        'duration',
        'director',
      ]);
      if (errors.length > 0) {
        console.log(
          'Cannot upload movie\nvalidation error\nfields: ' +
            errors.join('/') +
            '\n',
          movie
        );
        return;
      }
      upload.push(movie);
    });
    const result = await Movie.insertMany(upload);
    return result;
  } catch (error) {
    console.log(error);
  }
};

uploadMoviesFromFile('./src/fs/movies.json').then(res => {
  console.log(`Uploaded ${res.length} Movies: \n`, res);
});
