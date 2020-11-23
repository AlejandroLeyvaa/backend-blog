const express = require('express');

const response = require('../../../network/response');
const secure = require('./secure');
const Controller = require('./index');

const router = express.Router();

// Routes
router.get('/', list);
router.get('/:id', get);
router.post('/', insert);
// router.put('/', secure('update') );

function list(req, res, next) {
  Controller.list()
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
}

function get(req, res, next) {
  Controller.get(req.params.id)
    .then((post) => {
      response.success(req, res, post, 200);
    })
    .catch(next);
}

function insert(req, res, next) {
  Controller.insert(req.body)
    .then((post) => {
      response.success(req, res, post, 201);
    })
    .catch(next);
};


module.exports = router;
