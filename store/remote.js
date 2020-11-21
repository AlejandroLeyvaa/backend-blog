const request = require('request');

function createRemoteDB(host, port) {
  const URL = `http://${host}:${port}`;

  function list(table) {
    return req('GET', table);
  }

  function get(table, row, id) {
    return req('GET', table, id);
  }

  function req(method, table, data) {
    let url = `${URL}/${table}`;
    let body = '';

    if(data) {
      url = `${URL}/${table}/${data}`;
    };

    console.log(url);
    return new Promise((resolve, reject) => {
      request(
        {
          method,
          headers: {
            'Content-Type': 'aplication/json',
          },
          url,
          body,
        },
        (err, req, body) => {
          if (err) {
            console.error('ERROR IN REMOTE DATABASE', err);
            return reject(err.message);
          }

          const resp = JSON.parse(body);
          return resolve(resp.body);
        }
      );
    });
  }

  return {
    list,
    get,
  }
}

module.exports = createRemoteDB;