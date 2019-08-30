const Db = require('../db/db');
const { client } = new Db();

module.exports = {
  get: (id) => client.query('SELECT * FROM users WHERE id = $1', [id])
};
