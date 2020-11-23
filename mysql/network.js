const express = require('express');
const { nanoid } = require('nanoid');

const auth = require('../api/components/auth/index');

const response = require('../network/response');
const Store = require('../store/mysql');
const error = require('../utils/error');
const router = express.Router();

// Routes

router.get('/:table', list);
router.get('/:table/:id', get);
router.post('/:table', insert);
router.put('/:table/:id', update);
// router.put('/:table/:id', updateAndInsert);

let ROW = '';

async function list(req, res, next) {
  const data = await Store.list(req.params.table);

  if (req.params.table !== 'auth') {
    response.success(req, res, data, 200);
  } else {
    response.success(req, res, 'Unauthorized', 401);
  }
}

async function get(req, res, next) {
  if (req.params.table === 'users') {
    ROW = 'user_id';
  } else if (req.params.table === 'posts') {
    ROW = 'post_id';
  }

  const data = await Store.get(req.params.table, ROW, req.params.id);
  response.success(req, res, data, 200);
}

async function insert(req, res, next) {
  const body = req.body;

  if (req.params.table === 'users') {
    const user = {
      user_id: nanoid(),
      name: body.name,
      username: body.username,
    };

    if (body.password) {
      auth.updateAndInsert(
        {
          user_id: user.user_id,
          username: user.username,
          password: body.password,
        },
        'INSERT'
      );
    }

    const data = await Store.insert(req.params.table, user);
    response.success(req, res, data, 200);
  } else if (req.params.table === 'posts') {
    const data = await Store.insert(req.params.table, body);
    response.success(req, res, data, 200);
  };
};

async function update(req, res, next) {
  if (req.params.table === 'users') {
    ROW = 'user_id';
  } else if (req.params.table === 'posts') {
    ROW = 'post_id';
  }

  const data = await Store.update(req.params.table, req.params.id, ROW);
  response.success(req, res, data, 200);
}


module.exports = router;
