const db = {
  user: [
    {
      id: '1',
      name: 'Alejandro',
    },
  ],
};

async function list(table) {
  return db[table] || [];
}

async function get(table, id) {
  let collection = await list(table);
  return collection.filter((item) => item.id === id)[0] || null;
}

async function updateAndInsert(table, data) {
  if (!db[table]) {
    db[table] = [];
  }
  db[table].push(data);

  console.log(db);
}

async function query(table, q) {
  let collection = await list(table);
  let keys = Object.keys(q);
  let key = keys[0];

  return collection.filter((item) => item[key] === q[key])[0] || null;
}

module.exports = {
  list,
  get,
  updateAndInsert,
  query,
};
