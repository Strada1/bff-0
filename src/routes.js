const models = require('./models.js');
const { Movie } = models;
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('');
});
app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.post('/', (req, res) => {
  res.send('POST FILM');
});

app.put('/', (req, res) => {
  res.send('PUT FILM');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use(express.json());

app.post('/movies', async (req, res) => {
  try {
    await Movie.create(req.body); // добавляем документ
    return res.status(201).send('movie created'); // возвращаем ответ
  } catch (e) {
    return res.status(e.code).send('bad request');
  }
});
