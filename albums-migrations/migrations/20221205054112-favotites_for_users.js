export async function up(db, client) {
  await db.collection('users').updateMany({}, {$set: {favorites: []}})
}
export async function down(db, client) {
  await db.collection('users').updateMany({}, {$unset: {favorites: true}})
}
