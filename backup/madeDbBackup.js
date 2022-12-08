require('dotenv').config({ path: '../.env' });
const { exec } = require('child_process');
const uri = process.env.MONGO_URL;
const date = new Date().toLocaleDateString().replace(/\./g, '_');
const time = new Date().toLocaleTimeString().replace(/:/g, '_');

const createDirCommand = `mkdir -p ./${date}/${time}`;
const backupCommand = `mongodump --uri="${uri}" --archive="./${date}/${time}/backup.gzip" --gzip`;

exec(createDirCommand, logHandler);
exec(backupCommand, logHandler);

function logHandler(err, stdout, stderr) {
  if (err) {
    console.log(err);
  }
  if (stderr) {
    console.log(stderr);
  }
  console.log(stdout);
}
