const { nanoid } = require('nanoid');

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

  function insert(data) {
    const post = {
      post_id: nanoid(),
      text: data.text,
      user_id: data.user_id,
    };

    return store.insert(TABLE, post);
  }

  return {
    list,
    get,
    insert,
  };

};