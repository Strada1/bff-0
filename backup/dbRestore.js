require('dotenv').config({ path: '../.env' });
const { exec } = require('child_process');
const uri = process.env.MONGO_URL;
const pathToBackup = './08_12_2022/20_12_57/backup.gzip';

const restoreCommand = `mongorestore --uri="${uri}" --archive="${pathToBackup}" --gzip`;

exec(restoreCommand, logHandler);

function logHandler(err, stdout, stderr) {
  if (err) {
    console.log(err);
  }
  if (stderr) {
    console.log(stderr);
  }
  console.log(stdout);
}
