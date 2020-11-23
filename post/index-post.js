const express = require('express');

const { config } = require('../config/index')
const post = require('./components/post/network')
const errors = require('../network/errors');

const app = express();

app.use(express.json());

// Router

app.use('/api/post', post);

app.use(errors);

app.listen(config.post.port, () => {
  console.log(`Service listening on http://localhost:${config.post.port}`)
})
