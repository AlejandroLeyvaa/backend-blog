const express = require('express');

const { config } = require('../config');
const router = require('./network');

const app = express();

app.use(express.json());

app.use('/', router);

app.listen(config.mysqlService.port, () => {
  console.log(`MYSQL Service listening on http://localhost:${config.mysqlService.port}`)
});
