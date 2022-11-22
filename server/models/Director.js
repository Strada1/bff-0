const mongoose = require('mongoose');

const DirectorScheme = new mongoose.Schema({
  name: {
    type: 'String',
    require: true,
  },
});

module.exports = mongoose.model('Director', DirectorScheme);
