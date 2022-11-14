const {Schema, model} = require("mongoose");

const CategorySchema = new Schema({
    // определяем схему
    title: String
});

module.exports = model("Category", CategorySchema);
