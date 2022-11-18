const {Schema, model} = require("mongoose");
// const mongoose = require("mongoose");

const DirectorSchema = new Schema({
    firstName: String,
    lastName: String
});

module.exports = model("Director", DirectorSchema);
