const express = require('express');
const {
  getProducts, getProduct, getStyles, getRelated,
} = require('./controllers');

const router = express();

router.get('/products', getProducts);
router.get('/products/:productId', getProduct);
router.get('/products/:productId/styles', getStyles);
router.get('/products/:productId/related', getRelated);
router.get('/loaderio-ceb9bc2865684926d4b5cdb52c81dbbb.txt', (req, res) => {
  res.sendFile('./loaderio-ceb9bc2865684926d4b5cdb52c81dbbb.txt');
});

module.exports = router;
