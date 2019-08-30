const Db = require('../db/db');
const { client } = new Db();

module.exports = {
  gets: (id) => client.query(
      `SELECT p.id, p.name, p.img_url, p.price FROM products p 
      INNER JOIN store_product sp ON p.id = sp.product_id 
      INNER JOIN stores s ON s.id = sp.product_id
      WHERE s.id = $1`, [id]),
  get: (id) => client.query(
      `SELECT * FROM products WHERE id = $1`, [id]),
  create: (name, img, price) =>
    client.query('INSERT INTO products VALUES (DEFAULT, $1, $2, $3);', [name, img, price]),
  update: (id, name, img, price) =>
    client.query('UPDATE products SET name = $1, img_url = $2, price = $3 WHERE id = $4;',
        [name, img, price, id]),
  createStoreProduct: (storeId, productId) =>
    client.query('INSERT INTO store_product VALUES($1, $2);', [storeId, productId])
};
