const Db = require('../db/db');
const { client } = new Db();

module.exports = {
  get: (id) => client.query(
      'SELECT * FROM stores WHERE id = $1', [id]),
  gets: () => client.query(
      'SELECT * FROM stores;'),
  update: (id, email, name, image) => client.query(
      `UPDATE stores SET email = $1, name = $2, image = $3 WHERE id = $4`,
      [email, name, image, id])
};
