const express = require('express');
const {
  getProducts, getProduct, getStyles, getRelated,
} = require('./controllers');

const router = express();

router.get('/products', getProducts);
router.get('/products/:productId', getProduct);
router.get('/products/:productId/styles', getStyles);
router.get('/products/:productId/related', getRelated);

module.exports = router;
