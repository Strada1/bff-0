const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    label: String,
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Category", CategorySchema);
