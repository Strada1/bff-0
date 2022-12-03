export const up = (db, client) => {
  try {
    db.collection('users').updateMany({}, [{ $set: { favorites: [] } }]);
  } catch (err) {
    console.log(err);
  }
};

export const down = (db, client) => {
  try {
    db.collection('users').updateMany({}, { $unset: { favorites: 1 } });
  } catch (err) {
    console.log(err);
  }
};
