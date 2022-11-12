const url = "mongodb://localhost:27017/main";
const db = require("mongoose");
db.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = db;
