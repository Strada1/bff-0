const db = require("../ext/db");
const CategoriesSchema = new db.Schema({
  title: String,
});

module.exports = db.model("Category", CategoriesSchema);
