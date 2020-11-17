const express = require('express');

const secure = require('./secure');
const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

// Routes

router.get('/', list);
router.get('/:id', get);
router.post('/', updateAndInsert);
router.put('/', secure('update'), updateAndInsert);


function list(req, res){
  Controller.list()
    .then((usersList) => {
      response.success(req, res, usersList, 200);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500)
    })
};

function get(req, res) {
  Controller.get(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch((err) => {
      response.success(req, res, err.message, 500);
    });
};

function updateAndInsert (req, res) {
  Controller.updateAndInsert(req.body)
  .then((user) => {
    response.success(req, res, user, 201);
  })
  .catch((err) => {
    response.error(req, res, err.message, 500);
  });
};

module.exports = router;