const express = require('express');

const secure = require('./secure');
const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

// Routes

router.get('/', list);
router.get('/:id', get);
router.get('/:id/following', following);
router.post('/', updateAndInsert);
router.post('/follow/:id', secure('follow'), follow);
router.put('/', secure('update'), updateAndInsert);


function list(req, res, next){
  Controller.list()
    .then((usersList) => {
      response.success(req, res, usersList, 200);
    })
    .catch(next)
};

function get(req, res, next) {
  Controller.get(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch(next);
};

function updateAndInsert(req, res, next) {
  Controller.updateAndInsert(req.body)
  .then((user) => {
    response.success(req, res, user, 201);
  })
  .catch(next);
};

function follow(req, res, next) {
   Controller.follow(req.user.user_id, req.params.id)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch(next);
}

function following(req, res, next) {
  return Controller.following(req.params.id)
    .then((data) => {
      return response.success(req, res, data, 200);
    })
    .catch(next);
}

module.exports = router;