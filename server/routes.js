const express = require('express');
const {
  getProducts, getProduct, getStyles, getRelated,
} = require('./controllers');

const router = express();

router.get('/products', getProducts);
router.get('/products/:productId', getProduct);
router.get('/products/:productId/styles', getStyles);
router.get('/products/:productId/related', getRelated);
router.get('/loaderio-f3398dcd9e66dabfd2d979a0d74f9e85.txt', (req, res) => {
  res.sendFile(`${__dirname}/loaderio.txt`);
});

module.exports = router;
