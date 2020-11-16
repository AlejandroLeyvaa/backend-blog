const auth = require('../../auth')
const TABLE = 'auth';

module.exports = (injectedStore) => {
  let store = injectedStore;

  if (!store) {
    store = require('../../../store/dummy');
  }

  async function login(username, password) {
    const data = await store.query(TABLE, { username: username });
    console.log(['Data'], data);

    if (data.password === password) {
      // Token
      return auth.sign(data);
    } else {
      throw new Error('Informacion inválida');
    }
  }

  function updateAndInsert(data) {
    const authData = {
      id: data.id,
    };

    if (data.username) {
      authData.username = data.username;
    }

    if (data.password) {
      authData.password = data.password;
    }

    return store.updateAndInsert(TABLE, authData);
  }

  return {
    updateAndInsert,
    login
  };
};
