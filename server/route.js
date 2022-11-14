const app = require("./server.js");
const Movie = require('../scheme/movieScheme')

app.get("/", async (req, res) => {
  const info = await Movie.find();
  return res.status(200).send(info);
});

app.get("/find/:title", async (req, res) => {
  const title = req.params.title;
  const currentFilm = await Movie.findOne({ title });
  return res.status(200).send(currentFilm);
});

app.post("/movies", async (req, res) => {
  const currentFilm = await Movie.findOne({ title: req.body.title });
  if (currentFilm) {
    return res.status(404).send({message: `${req.body.title} has already been added to the film list`})
  }
  const movie = await Movie.create(req.body);
  return res.status(201).send(movie).json();
});

app.put("/movies/:title", async (req, res) => {
  const { title } = req.params;
  const updatedFilm = await Movie.findOneAndUpdate(
    { title },
    { $set: { ...req.body } },
    {
      returnDocument: "after",
    }
  );
  return res.status(201).send(updatedFilm);
});

app.delete("/movies/:name", async (req, res) => {
  const name = req.params.name;
  await Movie.deleteOne({ name });
  return res.status(201).send({ message: "film successfuly deleted" }).json();
});

app.delete("/movies_admin/:id", async (req, res) => {
  const id = req.params.id;
  const film = await Movie.findByIdAndDelete(id);
  return res.status(201).send({ message: "film successfuly deleted", data: film }).json();
});
