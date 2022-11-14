const {Schema, model} = require("mongoose");

const MovieSchema = new Schema({
    // определяем схему
    title: String,
    year: Number,
    rating: Number,
    category: {type: Schema.Types.ObjectId, ref: "Category"},
    duration: Number,
    director: String
});

module.exports = model("Movie", MovieSchema);
