module.exports = {
  async up(db) {
    try {
      await db.collection('movies').updateMany(
        {},
        [
          {
            $set: {
              description: '$title'
            }
          }
        ]
      );
    } catch (e) {
      console.log(e);
    }
  },

  async down(db) {
    await db.collection('movies').updateMany({}, { $unset: { description: 1 } });
  }
};
