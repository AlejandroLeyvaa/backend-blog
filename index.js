const express = require('express');
const { config } = require('./config');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {

  res.status(200).json({
    "Hello": "World"
  });
});

app.listen(config.port, () => {
  console.log(`http://localhost:${config.port}`);
});