const fetch = require('node-fetch');

function createRemoteDB(host, port) {
  const URL = `http://${host}:${port}`;

  function list(table) {
    return req('GET', table);
  }

  function get(table, row, id) {
    return req('GET', table, id);
  }

  function insert(table, data) {
    return req('POST', table, null, data);
  }

  function req(method, table, id, data) {
    let url = `${URL}/${table}`;
    let body = '';

    if(id) {
      url = `${URL}/${table}/${id}`;
    };

    if(data) {
      body = JSON.stringify(data);
    }

    return fetch(url,
      {
        method,
        body,
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => res.json())
      .catch((err) => console.error(err.message))
  }

  return {
    list,
    get,
    insert,
  }
}

module.exports = createRemoteDB;



// return new Promise((resolve, reject) => {
//   request(
//     {
//       method,
//       headers: {
//         'Content-Type': 'aplication/json',
//       },
//       url,
//       body,
//     },
//     (err, req, body) => {
//       if (err) {
//         console.error('ERROR IN REMOTE DATABASE', err);
//         return reject(err.message);
//       }

//       const resp = JSON.parse(body);
//       return resolve(resp.body);
//     }
//   );
// });