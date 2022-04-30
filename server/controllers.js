const os = require('os');
const fs = require('fs');
const models = require('./models');

module.exports = {
  getProducts: async (req, res) => {
    try {
      const t0 = performance.now();
      const page = req.query.page || 1;
      const count = req.query.count || 5;
      const result = await models.getProducts(page, count);
      const t1 = performance.now() - t0;
      fs.appendFile(`${__dirname}/response.txt`, `${os.hostname()} products res time: ${t1}ms \n`, (err) => {
        if (err) {
          console.log(err);
        }
      });
      res.json(result.rows);
    } catch (err) {
      res.sendStatus(404);
    }
  },
  getProduct: async (req, res) => {
    try {
      const { productId } = req.params;
      const t0 = performance.now();
      const result = await models.getProduct(productId);
      const t1 = performance.now() - t0;
      fs.appendFile(`${__dirname}/response.txt`, `${os.hostname()} product res time: ${t1}ms \n`, (err) => {
        if (err) {
          console.log(err);
        }
      });
      res.json(result.rows[0].product);
    } catch (err) {
      res.sendStatus(404);
    }
  },
  getStyles: async (req, res) => {
    try {
      const { productId } = req.params;
      const t0 = performance.now();
      const results = await models.getStyles(productId);
      const t1 = performance.now() - t0;
      fs.appendFile(`${__dirname}/response.txt`, `${os.hostname()} styles res time: ${t1}ms \n`, (err) => {
        if (err) {
          console.log(err);
        }
      });
      const styles = results.rows[0].product;
      res.json(styles);
    } catch (err) {
      res.sendStatus(404);
    }
  },
  getRelated: async (req, res) => {
    try {
      const { productId } = req.params;
      const t0 = performance.now();
      const result = await models.getRelated(productId);
      const t1 = performance.now() - t0;
      fs.appendFile(`${__dirname}/response.txt`, `${os.hostname()} related res time: ${t1}ms \n`, (err) => {
        if (err) {
          console.log(err);
        }
      });
      const { related } = result.rows[0];
      if (!related) {
        throw new Error();
      }
      res.json(related);
    } catch (err) {
      res.sendStatus(404);
    }
  },
};
