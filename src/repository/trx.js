const Db = require('../db/db');
const { client } = new Db();

module.exports = {
  tran: () => client.query('BEGIN TRANSACTION;'),
  rollback: () => client.query('ROLLBACK;'),
  getByUser: (id) => client.query('SELECT * FROM trx_headers WHERE user_id = $1 ORDER BY id DESC;', [id]),
  getLastInsert: () => client.query('SELECT * FROM trx_headers ORDER BY id DESC LIMIT 1;'),
  get: (id) => client.query('SELECT * FROM trx_headers WHERE id = $1;', [id]),
  create: (storeId, userId, date) => client.query(
      `INSERT INTO trx_headers(id, store_id, user_id, status, ordered_at)
      VALUES(DEFAULT, $1, $2, 'pending', $3);`,
      [storeId, userId, date]),
  createDetail: (headerId, productId, qty) => client.query(
      `INSERT INTO trx_details VALUES($1, $2, $3);`, [headerId, productId, qty]),
  canceled: (id, date, updatedBy, notes = '') => client.query(
      `UPDATE trx_headers SET status = 'canceled', canceled_at = $1, canceled_by = $2, notes = $3
      WHERE id = $4;`,
      [date, updatedBy, notes, id]),
  confirmed: (id, date) => client.query(
      `UPDATE trx_headers SET status = 'confirmed', confirmed_at = $1 WHERE id = $2;`, [date, id]),
  process: (id, date) => client.query(
      `UPDATE trx_headers SET status = 'process', process_at = $1 WHERE id = $2;`, [date, id]),
  ready: (id, date) => client.query(
      `UPDATE trx_headers SET status = 'ready', ready_at = $1 WHERE id = $2;`, [date, id]),
  done: (id, date) => client.query(
      `UPDATE trx_headers SET status = 'done', done_at = $1 WHERE id = $2;`, [date, id]),
  review: (id, review, rating, date) => client.query(
      `INSERT INTO reviews VALUES(DEFAULT, $1, $2, $3, $4);`, [id, review, rating, date]),
  getReviews: (storeId) => client.query(
      `SELECT r.id, review, rating, created_at
      FROM trx_headers t INNER JOIN reviews r ON r.trx_header_id = t.id WHERE t.store_id = $1`,
      [storeId]),
  getByStore: (id) => client.query(
      `SELECT * FROM trx_headers WHERE store_id = $1 ORDER BY id DESC;`, [id]),
  getTransactionDetail: (id) => client.query(
      `SELECT th.*, td.qty, p.name, p.img_url, p.price, r.rating, r.review
      FROM trx_headers th INNER JOIN trx_details td ON th.id = td.trx_header_id
      INNER JOIN products p ON p.id = td.product_id INNER JOIN reviews r ON r.trx_header_id = th.id
      WHERE th.id = $1;`, [id])
};
