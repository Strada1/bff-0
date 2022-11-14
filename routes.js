const app = require("./server");
const { Category, Movie } = require('./dataBase')


app.post('/movies', async (req, res) => {
  try {
    await Movie.create(req.body)
    return res.status(201).send('movie created')
  } catch (err) {
    return res.send(`Error! Bad request, code: ${err.code}`)
  }
});

app.post('/categories', async (req, res) => {
  try {
    await Category.create(req.body)
    return res.status(201).send('category created')
  } catch (err) {
    return res.send(`Error! Bad request, code: ${err.code}`)
  }
});