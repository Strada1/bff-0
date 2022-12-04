module.exports = {
  async up(db, client) {
    await db.collection('movies').updateMany( {}, [{ "$set": { "description": "$title" } }] );
  },

  async down(db, client) {
    await db.collection('movies').updateMany( {}, { "$unset": { "description": 1 } } );
  }
};
