module.exports = {
  async up(db) {
    try {
      await db.collection('users').updateMany({}, { $set: { favorites: [] } });
    } catch (e) {
      console.log(e);
    }
  },

  async down(db) {
    await db.collection('users').updateMany({}, { $unset: { favorites: 1 } });
  }
};
