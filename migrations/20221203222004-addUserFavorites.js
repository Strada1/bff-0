module.exports = {
  async up(db) {
    return db.collection('users').updateMany({}, [{ $set: { favorites: [] } }]);
  },

  async down(db) {
    return db.collection('users').updateMany({}, [{ $unset: 'favorites' }]);
  },
};
