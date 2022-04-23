const models = require('./models');

module.exports = {
  getProducts: async (req, res) => {
    try {
      const page = req.query.page || 1;
      const count = req.query.count || 5;
      const result = await models.getProducts(page, count);
      res.json(result.rows);
    } catch (err) {
      res.sendStatus(404);
    }
  },
  getProduct: async (req, res) => {
    try {
      const { productId } = req.params;
      const result = await models.getProduct(productId);
      res.json(result.rows[0].product);
    } catch (err) {
      res.sendStatus(404);
    }
  },
  getStyles: async (req, res) => {
    try {
      const { productId } = req.params;
      const results = await models.getStyles(productId);
      const styles = results.rows[0].product;
      const mapped = styles.results.map(async (style) => {
        const styleObj = { ...style };
        const skus = await models.getSkus(style.style_id);
        const skuObj = {};
        skus.rows.forEach((sku) => {
          skuObj[sku.id] = { quantity: sku.quantity, size: sku.size };
        });
        styleObj.skus = skuObj;
        return styleObj;
      });
      const mappedStyles = await Promise.all(mapped);
      styles.results = mappedStyles;
      res.json(styles);
    } catch (err) {
      res.sendStatus(404);
    }
  },
  getRelated: async (req, res) => {
    try {
      const { productId } = req.params;
      const result = await models.getRelated(productId);
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
