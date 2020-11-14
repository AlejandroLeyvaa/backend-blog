const db = {
  'user': [{
    id: '1',
    name: 'Alejandro',
  }]
}

async function list(table) {
  return db[table];
};

async function get(table, id) {
  let collection = await list(table);
  return collection.filter((item) => item.id === id)[0] || null;
};

async function updateAndInsert(table, data) {
  db[collection].push(data);
};

module.exports = {
  list,
  get,
  updateAndInsert,
};