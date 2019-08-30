const moment = require('moment');

const userRepo = require('../repository/user');
const storeRepo = require('../repository/store');
const trxRepo = require('../repository/trx');

module.exports = {
  getReviews: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { rows } = await trxRepo.getReviews(id);
      return res.send(rows);
    } catch (error) {
      return next(error);
    }
  },
  getByUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { rows } = await trxRepo.getByUser(id);
      return res.send(rows);
    } catch (error) {
      return next(error);
    }
  },
  getByStore: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { rows } = await trxRepo.getByStore(id);
      return res.send(rows);
    } catch (error) {
      return next(error);
    }
  }
};
