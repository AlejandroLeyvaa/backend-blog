const express = require('express');

const { config } = require('../config');
const user = require('./components/user/network');
const auth = require('./components/auth/network');
// const post = require('./components/post/network');
const errors = require('../network/errors');

const app = express();

app.use(express.json());

// Routes

app.get('/', (req, res) => {
  res.status(200).json({
    Hello: 'World',
  });
});

app.use('/api/user', user);
// app.use('/api/post', post);
app.use('/api/auth', auth);

app.use(errors);

app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${config.port}`);
});
