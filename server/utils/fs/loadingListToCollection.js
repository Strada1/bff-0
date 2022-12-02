import * as fs from 'node:fs/promises';

// USING
// loadingListToCollection(
//     './utils/fs/movies.json',
//     Movie,
//     ['title', 'year', 'duration', 'categories', 'directors']
//   ).then(console.log);

async function loadingListToCollection(pathToList, model, validationFieldsList) {
  try {
    const file = await fs.readFile(pathToList, { encoding: 'utf8' });
    const docs = JSON.parse(file);
    const loadingList = [];

    let successCount = 0;
    let errorCount = 0;
    const map = new Map();

    for (let doc of docs) {
      const missingFields = validate(validationFieldsList, doc);

      if (missingFields.length > 0) {
        map.set(missingFields, doc);
        errorCount++;
        continue;
      }

      loadingList.push(doc);
      successCount++;
    }

    console.log(`Success: ${successCount}, Errors: ${errorCount}`);
    console.log('Map Errors: ', map);

    return await model.insertMany(loadingList);
  } catch (err) {
    console.log(err);
  }
}

function validate(fields, obj) {
  return fields.filter(field => !(field in obj));
}