const express = require('express');
const {
  getProducts, getProduct, getStyles, getRelated,
} = require('./controllers');

const router = express();

router.get('/products', getProducts);
router.get('/products/:productId', getProduct);
router.get('/products/:productId/styles', getStyles);
router.get('/products/:productId/related', getRelated);
router.get('/loaderio-deb02323937d8e605bb7ea207b8ad0c4.txt', (req, res) => {
  res.sendFile(`${__dirname}/loaderio.txt`);
});

module.exports = router;
