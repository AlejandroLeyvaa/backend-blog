const { nanoid } = require('nanoid');
const auth = require('../auth')

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

  async function updateAndInsert(body) {
    const user = {
      name: body.name,
      username: body.username,
    }

    if (body.id) {
      user.id = body.id;
    } else {
      user.id = nanoid();
    }

    if (body.password || body.username) {
      await auth.updateAndInsert({
        id: user.id,
        username: user.username,
        password: body.password,
      });
    }

    return store.updateAndInsert(TABLE, user)
  }

  return {
    list,
    get,
    updateAndInsert,
  };
};
