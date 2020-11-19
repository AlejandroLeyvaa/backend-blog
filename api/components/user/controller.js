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
      await auth.updateAndInsert(
        {
          user_id: user.user_id,
          username: user.username,
          password: body.password,
        },
        'UPDATE'
      );
      return store.updateAndInsert(TABLE, user, 'UPDATE');
    } else {
      user.user_id = nanoid();
      await auth.updateAndInsert(
        {
          user_id: user.user_id,
          username: user.username,
          password: body.password,
        },
        'INSERT'
      );
      return store.updateAndInsert(TABLE, user, 'INSERT');
    }
  }

  function follow(from, to) {
    return store.updateAndInsert(TABLE + '_follow', {
      user_from: from,
      user_to: to,
    });
  }

  async function following(user) {
    const join = {};

    join[TABLE] = 'user_to';
    const query = { user_from: user};

    return await store.query(TABLE + '_follow', query, join);
  }

  return {
    list,
    get,
    updateAndInsert,
    follow,
    following
  };
};
