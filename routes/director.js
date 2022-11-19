const DirectorScheme = require("../scheme/directorScheme");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const directorList = await DirectorScheme.find();
    if (directorList.length) {
      return res.status(201).send(directorList);
    } else {
      return res.status(201).send({ message: "The director's list is empty" });
    }
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    const createdDirector = await DirectorScheme.create(req.body);
    if (createdDirector) {
      res.status(200).send({
        message: "Director successfuly created!",
        data: createdDirector,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: err.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const createdDirector = await DirectorScheme.findByIdAndDelete(
      req.params.id
    );
    if (createdDirector) {
      res.status(200).send({
        message: "Director successfuly deleted!",
        data: createdDirector,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: err.message });
  }
});

router.patch("/update/:id", async (req, res) => {
  try {
    const createdDirector = await DirectorScheme.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (createdDirector) {
      res.status(200).send({
        message: "Director successfuly updated!",
        data: createdDirector,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: err.message });
  }
});

module.exports = router;
