const {Category} = require("../schemas");

function createCategory(options) {
    return Category.create(options)
}

module.exports = {createCategory}