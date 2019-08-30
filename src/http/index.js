const router = require('express').Router();
const { validate } = require('./handlers');

const user = require('../usecase/user');
const store = require('../usecase/store');
const trx = require('../usecase/trx');


router.get('/check', validate(), (req, res) => res.send({ status: 'goods' })); // V

router.get('/user/:id', validate('GET_BY_ID'), user.get); // V
router.post('/user/:id/review', validate('ADD_REVIEW'), user.review); // V
router.get('/user/:id/trx', validate('GET_BY_ID'), trx.getByUser); // V

router.post('/order', validate('ADD_TRX'), user.order); // V
router.put('/order/:id/cancel', validate('UPDATE_TRX_NOTES'), user.cancel); // V

router.get('/store', validate(), store.gets); // V
router.get('/store/:id', validate('GET_BY_ID'), store.get); // v
router.get('/store/:id/trx', validate('GET_BY_ID'), trx.getByStore); // V
router.get('/store/:id/product', validate('GET_BY_ID'), store.getProducts); // V
router.put('/store/:id/status', validate('UPDATE_TRX_STATUS'), store.updateTrx); // V

router.get('/review/:id', validate('GET_BY_ID'), trx.getReviews); // V

router.get('/product/:id', validate('GET_BY_ID'), store.getProductDetail); // V

module.exports = router;
