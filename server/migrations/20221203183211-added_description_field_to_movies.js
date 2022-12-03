export const up = (db, client) => {
  try {
    db.collection('movies').updateMany({}, [{ $set: { description: '$title' } }]);
  } catch (err) {
    console.log(err);
  }
};

export const down = (db, client) => {
  try {
    db.collection('movies').updateMany({}, { $unset: { description: 1 } });
  } catch (err) {
    console.log(err);
  }
};