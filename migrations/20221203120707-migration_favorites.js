module.exports = {
  async up(db, client) {
    await db.collection('users').updateMany( {}, [{ "$set": { "favorites": [] } }] );
  },

  async down(db, client) {
    await db.collection('users').updateMany( {}, { "$unset": { "favorites": 1 } } );
  }
};
