const mysql = require('mysql');

const { config } = require('../config/index');

const dbConfig = {
  host: config.mysql.host,
  port: config.mysql.port,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

const clearDB = {
  host: config.clear.host,
  port: config.clear.port,
  user: config.clear.user,
  password: config.clear.password,
  database: config.clear.database,
};
// connection

let connection;

function handleConnection() {
  connection = mysql.createConnection(clearDB);

  connection.connect((err) => {
    if (err) {
      console.error('[DB error]', err);
      setTimeout(handleConnection, 2000);
    } else {
      console.log('DB Connected');
    }
  });

  connection.on('error', (err) => {
    console.error('[db err]', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleConnection();
    } else {
      throw err;
    }
  });
}

handleConnection();

function list(table) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (err, data) => {
      if (err) return reject(err);

      resolve(data);
    });
  });
}

function get(table, row, id) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${table} WHERE ${row}='${id}'`,
      (err, data) => {
        if (err) return reject(err);

        resolve(data);
      }
    );
  });
}

function insert(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

function update(table, data, row) {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE ${table} SET ? WHERE ${row}='${data.user_id}'`,
      [data, data.user_id],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
}

function updateAndInsert(table, data, action, row) {
  if (action === 'UPDATE') {
    return update(table, data, row);
  } else if('INSERT') {
    return insert(table, data);
  }
}

function query(table, q, join) {
  let joinQuery = '';
  if(join) {
    const key = Object.keys(join)[0];
    const val = join[key];
    joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.user_id`
  }

  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, q, (err, res) => {
      if (err) return reject(err);
      resolve(res[0] || null);
    });
  });
}

module.exports = {
  list,
  get,
  insert,
  updateAndInsert,
  query,
};
