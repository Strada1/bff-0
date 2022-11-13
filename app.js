const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const url = 'mongodb://localhost:27017/main';

const router = require('./routers.js');

app.use(express.json());
app.use('/', router);
app.use('/movies', router);
app.use('/categories', router);

function App() {
  try {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (e) {
    console.log(e.message);
  }
}

App();
