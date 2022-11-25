import * as fs from 'node:fs/promises';
import Movie from '../models/Movie.js';

loadingListToCollection('../movies.json', Movie).then(console.log);

async function loadingListToCollection(path, model) {
  try {
    const file = await fs.readFile(path, { encoding: 'utf8' });
    const docs = JSON.parse(file);
    const loadingList = [];

    for (let doc of docs) {
      const missingFields = validate(['title', 'year', 'duration'], doc);

      if (missingFields.length > 0) {
        console.log(`missing fields: ${missingFields.join(', ')}`);
        continue;
      }
      loadingList.push(doc);
    }

    return await model.create(loadingList);
  } catch (err) {
    console.log(err);
  }
}

function validate(fields, obj) {
  return fields.filter(field => !(field in obj));
}