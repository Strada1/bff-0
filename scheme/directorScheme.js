const mongoose = require("mongoose");

const DirectorSchema = new mongoose.Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Director", DirectorSchema);
