const auth = require('../../../auth');

module.exports = function checkAuth(action) {
  function middleware(req, res, next) {
    switch (action) {
      case 'update':
        const owner = req.body.user_id;
        console.log('OWNER', owner, )
        auth.check.own(req, owner);
        next();
        break;

      case 'follow':
        auth.check.logged(req);
        next()
        break

      default:
        next();
    }
  }

  return middleware;
};
