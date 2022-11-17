const {Schema, model} = require("mongoose");
// const mongoose = require("mongoose");

const MovieSchema = new Schema({
    title: String,
    year: Number,
    rating: Number,
    category: {type: Schema.Types.ObjectId, ref: "Category"},
    duration: Number,
    director: String
});

module.exports = model("Movie", MovieSchema);

// const Movie = mongoose.model("Movie", {
//     title: String,
//     year: Number,
//     rating: Number,
//     category: {type: mongoose.Schema.Types.ObjectId, ref: "Category"},
//     duration: Number,
//     director: String
// });

// module.exports = {Movie};
