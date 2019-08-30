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
  },
  getById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { rows } = await trxRepo.getTransactionDetail(id);
      if (!rows.length) return res.send({ message: 'not found' });
      console.log(rows);
      const result = {};
      result['id'] = rows[0].id;
      result['store_id'] = rows[0].store_id;
      result['user_id'] = rows[0].user_id;
      result['status'] = rows[0].status;
      result['ordered_at'] = rows[0].ordered_at;
      result['canceled_at'] = rows[0].canceled_at;
      result['confirmed_at'] = rows[0].confirmed_at;
      result['process_at'] = rows[0].process_at;
      result['ready_at'] = rows[0].ready_at;
      result['done_at'] = rows[0].done_at;
      result['canceled_by'] = rows[0].canceled_by;
      result['rating'] = rows[0].rating;
      result['review'] = rows[0].review;
      result['products'] = rows.map((obj) => {
        return {
          img_url: obj.img_url,
          name: obj.name,
          price: obj.price,
          qty: obj.qty
        };
      });
      return res.send(result);
    } catch (error) {
      return next(error);
    }
  }
};
