const {Schema, model} = require("mongoose");

const CategorySchema = new Schema({
    title: String
});

module.exports = model("Category", CategorySchema);
