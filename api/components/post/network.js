const express = require('express');

const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

// Routes
router.get('/', list);
router.get('/:id', get);
router.post('/', updateAndInsert);
// router.put('/', secure('update'), updateAndInsert);

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

function updateAndInsert() {
  
}
module.exports = router;
