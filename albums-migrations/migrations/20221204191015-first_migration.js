export async function up(db, client) {
  await db
    .collection('movies')
    .updateMany({}, [{$set: {description: '$title'}}])
}
export async function down(db, client) {
  await db.collection('movies').updateMany({}, {$unset: {description: true}})
}
