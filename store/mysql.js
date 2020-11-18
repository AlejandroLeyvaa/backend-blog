const mysql = require('mysql');

const { config } = require('../config/index');

const dbConfig = {
  host: config.mysql.host,
  port: config.mysql.port,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

// connection

let connection;

function handleConnection() {
  connection = mysql.createConnection(dbConfig);

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

function get(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${table} WHERE user_id=${id}`,
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

function update(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE ${table} SET ? WHERE user_id=?`,
      [data, data.user_id],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
}

function updateAndInsert(table, data, action) {
  if (action === 'UPDATE') {
    console.log('UPDATE');
    return update(table, data);
  } else if('INSERT') {
    console.log('INSERT DATA');
    return insert(table, data);
  }
}

function query(table, q) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE ?`, q, (err, res) => {
      if (err) return reject(err);
      resolve(res[0] || null);
    });
  });
}

module.exports = {
  list,
  get,
  updateAndInsert,
  query,
};
