const TABLE = 'posts';
const ROW = 'post_id';

module.exports = function (injectedStore) {
  let store = injectedStore;

  if (!store) {
    store = require('../../../store/dummy');
  }

  function list() {
    return store.list(TABLE);
  }

  function get(id) {
    return store.get(TABLE, ROW, id);
  }

  return {
    list,
    get,
  };

};