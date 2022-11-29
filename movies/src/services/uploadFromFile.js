const fs = require('fs/promises');
const { createMovie } = require('./movieService');

const validate = (data, requiredFields) => {
  const missingFields = [];
  for (const field of requiredFields) {
    if (!data[field]) {
      missingFields.push(field);
    }
  }
  return missingFields;
};

const uploadMoviesToDB = async (path) => {
  try {
    const data = await fs.readFile(path, { encoding: 'utf8' });
    const movies = JSON.parse(data);
    for (const movie of movies) {
      const missingFields = validate(movie, [
        'title',
        'year'
      ]);
      if (missingFields.length > 0) {
        console.log(`Can not upload movie ${movie}`);
      } else {
        await createMovie(movie);
      }
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = { uploadMoviesToDB };