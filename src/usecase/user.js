const moment = require('moment');
const Promise = require('bluebird');
const userRepo = require('../repository/user');
const storeRepo = require('../repository/store');
const trxRepo = require('../repository/trx');

const mailer = require('../helpers/email');

module.exports = {
  get: async (req, res, next) => {
    try {
      const { rows } = await userRepo.get(req.params.id);
      return res.send(rows[0]);
    } catch (error) {
      return next(error);
    }
  },
  order: async (req, res, next) => {
    try {
      const {
        store_id,
        user_id,
        products
      } = req.body;
      await trxRepo.create(store_id, user_id, moment());
      const { rows } = await trxRepo.getLastInsert();
      await Promise.mapSeries(products, async (product) => {
        const { id, qty } = product;
        const a = await trxRepo.createDetail(rows[0].id, id, qty);
        console.log(a);
      });
      return res.send(rows[0]);
    } catch (error) {
      return next(error);
    }
  },
  cancel: async (req, res, next) => {
    try {
      const { id } = req.params;
      const {
        notes,
        canceled_by
      } = req.body;
      const { rows } = await trxRepo.get(id);
      if (rows[0].status != 'pending') return res.send({ message: 'status should pending' });
      await trxRepo.canceled(id, moment(), canceled_by, notes);
      const { rows: trx } = await trxRepo.get(id);
      let emailTo = '';
      let canceledBy = '';
      const { rows: user } = await userRepo.get(trx[0].user_id);
      const { rows: store } = await storeRepo.get(trx[0].store_id);
      if (canceled_by == 1) {
        emailTo = store[0].email;
        canceledBy = 'Pembeli';
      } else {
        emailTo = user[0].email;
        canceledBy = 'Penjual';
      }
      mailer.send({
        from: 'PT. XXX',
        to: process.env.NODE_ENV === 'production' ?
          emailTo : process.env.NOTIFICATION_EMAIL,
        subject: 'STATUS PEMBELIAN',
        text: '<h2>Konfirmasi Email Anda</h2></br></br>',
        html: `<p>transaction anda dengan nomor ${trx[0].id} dibatalkan oleh ${canceledBy}</p>`
      });
      return res.send({ message: 'canceled' });
    } catch (error) {
      return next(error);
    }
  },
  review: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { review, rating } = req.body;
      await trxRepo.review(id, review, rating, moment());
      return res.send({ message: 'reviewed' });
    } catch (error) {
      return next(error);
    }
  },
  getTrx: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { rows } = await trxRepo.getByUser(id);
      if (rows.length < 0) return res.send([]);
      return res.send(rows);
    } catch (error) {
      return next(error);
    }
  }
};
