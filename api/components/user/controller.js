const { nanoid } = require('nanoid');
const auth = require('../auth');

const TABLE = 'users';

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
    };

    if (body.user_id) {
      user.user_id = body.user_id;
      await auth.updateAndInsert({
        user_id: user.user_id,
        username: user.username,
        password: body.password,
      }, 'UPDATE');
      return store.updateAndInsert(TABLE, user, 'UPDATE');
    } else {
      user.user_id = nanoid();
      await auth.updateAndInsert({
        user_id: user.user_id,
        username: user.username,
        password: body.password,
      }, 'INSERT');
      return store.updateAndInsert(TABLE, user, 'INSERT');
    }
  }

  return {
    list,
    get,
    updateAndInsert,
  };
};
