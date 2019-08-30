const router = require('express').Router();
const { validate } = require('./handlers');

const user = require('../usecase/user');
const store = require('../usecase/store');
const trx = require('../usecase/trx');


router.get('/check', validate(), (req, res) => res.send({ status: 'goods' }));

router.get('/user/:id', validate('GET_BY_ID'), user.get);
router.get('/user/:id/trx', validate('GET_BY_ID'), user.getTrx);
router.post('/user/:id/review', validate('ADD_REVIEW'), user.review);
router.get('/user/trx', validate('GET_BY_ID'), trx.getByUser);

router.post('/order', validate('ADD_TRX'), user.order);
router.put('/order/cancel/:id', validate('UPDATE_TRX_NOTES'), user.cancel);

router.get('/store', validate(), store.gets);
router.get('/store/:id', validate('GET_BY_ID'), store.get);
router.get('/store/:id/trx', validate('GET_BY_ID'), trx.getByStore);
router.get('/store/:id/product', validate('GET_BY_ID'), store.getProducts);
router.put('/store/:id/status', validate('UPDATE_TRX_STATUS'), store.updateTrx);

router.get('/review/:id', validate('GET_BY_ID'), trx.getReviews);

router.get('/product/:id', validate('GET_BY_ID'), store.getProductDetail);

module.exports = router;
