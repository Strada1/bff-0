# chat
sudo systemctl start mongod - start db

node src/app.js - start app

Backup: sudo mongodump --db db_name --out backup/date +"%m-%d-%y"

Restore: sudo mongorestore --db db_name --drop backup/01-01-19/db_name/ --drop argument for drop database before restore
