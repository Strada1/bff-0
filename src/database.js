const mongoose = require('mongoose');
const url = process.env.MONGO_CONNECT_STRING;

module.exports.connectDataBase = () => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('database connected');
};
