const nanoid = require('nanoid');

const TABLE = 'user';

module.exports = (injectedStore) => {
  let store = injectedStore;

  if (!store) {
    store = require('../../../store/dummy');
  }

  function list() {
    return store.list(TABLE);
  }

  function get(id) {
    return store.get(TABLE, id);
  }

  function updateAndInsert(body) {
    const user = {
      name: body.name
    }

    if (body.id) {
      user.id = body.id;
    } else {
      user.id = nanoid();
    }

    return store.updateAndInsert(TABLE, user)
  }

  return {
    list,
    get,
    updateAndInsert,
  };
};
