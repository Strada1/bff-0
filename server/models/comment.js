const {Schema, model} = require("mongoose");

const CommentSchema = new Schema({
    text: String,
    movie: {type: Schema.Types.ObjectId, ref: "Movie"}
});

module.exports = model("Comment", CommentSchema);
