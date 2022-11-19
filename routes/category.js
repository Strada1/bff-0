const express = require("express");
const router = express.Router();
const {
  createCategory,
  findAllCategories,
  CategoryModel,
  updateMovie,
} = require("../services/categoryService");

router.get("/", async (req, res) => {
  try {
    const categoryList = await findAllCategories();
    if (categoryList.length) {
      return res.status(201).send(categoryList);
    } else {
      return res.status(201).send({ message: "Category list is empty" });
    }
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    const category = await createCategory(req.body);
    return res
      .status(201)
      .send({ message: "Category created!", data: category });
  } catch (err) {}
});

router.patch("/update/:id", async (req, res) => {
  try {
    const category = await updateMovie(req);
    return res
      .status(201)
      .send({ message: "Category will be updated!", data: category });
  } catch (err) {}
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const category = await CategoryModel.findByIdAndDelete(req.params.id);
    return res
      .status(201)
      .send({ message: "Category will be deleted!", data: category });
  } catch (err) {}
});

module.exports = router;
