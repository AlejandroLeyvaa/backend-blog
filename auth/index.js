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
    console.log('[Decoded]', decoded, owner);

    if (decoded.user_id !== owner) {
      throw error('Unauthorized', 401);
    }
  },

  logged: function(req) {
    const decoded = decodeHeader(req);
  }
};

function getToken(auth) {
  if (!auth) {
    throw new Error('Toke not found');
  }

  if (auth.indexOf('Bearer ') === -1) {
    throw error('Invalid format', 401);
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
