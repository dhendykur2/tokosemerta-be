const moment = require('moment');
const QRCode = require('qrcode');

const storeRepo = require('../repository/store');
const productRepo = require('../repository/product');
const trxRepo = require('../repository/trx');
const userRepo = require('../repository/user');

const mailer = require('../helpers/email');

module.exports = {
  gets: async (req, res, next) => {
    try {
      const { rows } = await storeRepo.gets();
      return res.send(rows);
    } catch (error) {
      return next(error);
    }
  },
  get: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { rows } = await storeRepo.get(id);
      return res.send(rows[0]);
    } catch (error) {
      return next(error);
    }
  },
  getProducts: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { rows } = await productRepo.gets(id);
      return res.send(rows);
    } catch (error) {
      return next(error);
    }
  },
  getProductDetail: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { rows } = await productRepo.get(id);
      return res.send(rows);
    } catch (error) {
      return next(error);
    }
  },
  updateTrx: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const { rows: trx } = await trxRepo.get(id);
      const { rows: user } = await userRepo.get(trx[0].user_id);
      let message = '';
      if (status === 'confirm') {
        await trxRepo.confirmed(id, moment());
        message = 'pesanan anda dikonfirmasi';
      } else if (status === 'process') {
        await trxRepo.process(id, moment());
        message = 'pesanan anda diproses';
      } else if (status === 'ready') {
        message = 'pesanan anda telah siap silahkan diambil';
        await QRCode.toDataURL(id.toString(), async (err, url) => {
          await trxRepo.ready(id, url, moment());
        });
      } else if (status == 'done') {
        await trxRepo.done(id, moment());
        message = 'pesanan anda telah selesai';
      } else {
        return res.send({ message: 'not found' });
      }
      // mailer.send({
      //   from: 'PT. XXX',
      //   to: process.env.NODE_ENV === 'production' ?
      //     user[0].email : process.env.NOTIFICATION_EMAIL,
      //   subject: 'STATUS PEMBELIAN',
      //   text: '<h2>Konfirmasi Email Anda</h2></br></br>',
      //   html: `<p>${message}</p>`
      // });
      return res.send({ message: 'success' });
    } catch (error) {
      return next(error);
    }
  }
};
