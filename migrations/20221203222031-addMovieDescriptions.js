module.exports = {
  async up(db) {
    return db
      .collection('movies')
      .updateMany({}, [{ $set: { description: '$title' } }]);
  },

  async down(db) {
    return db
      .collection('movies')
      .updateMany({}, [{ $unset: 'description'}]);
  },
};
