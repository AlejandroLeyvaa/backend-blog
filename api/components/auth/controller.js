const bcrypt = require('bcrypt');
const auth = require('../../../auth');
const TABLE = 'auth';

module.exports = (injectedStore) => {
  let store = injectedStore;

  if (!store) {
    store = require('../../../store/dummy');
  }

  async function login(username, password) {
    const data = await store.query(TABLE, { username: username });

    return bcrypt.compare(password, data.password)
      .then((isEquals) => {
        if (isEquals === true) {
          return auth.sign(data);
        } else {
          throw new Error('Información inválida');
        }
      });
    console.log(['Data'], data);

    if (data.password === password) {
      // Token
      return auth.sign(data);
    } else {
      throw new Error('Informacion inválida');
    }
  }

  async function updateAndInsert(data) {
    const authData = {
      id: data.id,
    };

    if (data.username) {
      authData.username = data.username;
    }

    if (data.password) {
      authData.password = await bcrypt.hash(data.password, 10);
    }

    return store.updateAndInsert(TABLE, authData);
  }

  return {
    updateAndInsert,
    login
  };
};
