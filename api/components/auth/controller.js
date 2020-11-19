const bcrypt = require('bcrypt');
const auth = require('../../../auth');
const TABLE = 'auth';

module.exports = (injectedStore) => {
  let store = injectedStore;

  if (!store) {
    store = require('../../../store/dummy');
  }

  async function login(username, pass) {
    console.log('LOGIN FUNCTION', username, pass);
    const data = await store.query(TABLE, { username: username });
    console.log('DATA', data);
    return bcrypt.compare(pass, data.password)
      .then((isEquals) => {
        if (isEquals === true) {
          return auth.sign({ ...data});
        } else {
          throw new Error('Unauthorized');
        }
      });
  }

  async function updateAndInsert(data, action, row) {

    console.log('[------]', data, action)
    const authData = {
      user_id: data.user_id,
    };

    if (data.username) {
      authData.username = data.username;
    }

    if (data.password) {
      authData.password = await bcrypt.hash(data.password, 10);
    }

    if (action === 'UPDATE') {
      return store.updateAndInsert(TABLE, authData, action, row);
    } else {
      console.log('-------------------------->')
      return store.updateAndInsert(TABLE, authData, action);
    }
  }

  return {
    updateAndInsert,
    login
  };
};
