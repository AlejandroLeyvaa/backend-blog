const jwt = require('jsonwebtoken');
const { config } = require('../config/index');
const error = require('../utils/error');

const secret = config.jwtSecret;

function sign(data) {
  return jwt.sign(data, secret);
};

function verify(token) {
  return jwt.verify(token, secret);
};

const check = {
  own: function (req, owner) {
    const decoded = decodeHeader(req);
    console.log('[Decoded]', decoded);

    if (decoded.id !== owner) {
      throw error('Unauthorized', 401);
    }
  },
};

function getToken(auth) {
  if (!auth) {
    throw new Error('Toke not found');
  }

  if (auth.indexOf('Bearer ') === -1) {
    throw new Error('Invalid format');
  }

  let token = auth.replace('Bearer ', '');
  return token;
}

function decodeHeader(req) {
  const authorization = req.headers.authorization || '';
  const token = getToken(authorization);
  const decoded = verify(token);

  req.user = decoded;

  return decoded;
}

module.exports = {
  sign,
  check,
};
