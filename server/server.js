require('./connectDatabase')();

const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

require('./router/')(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
