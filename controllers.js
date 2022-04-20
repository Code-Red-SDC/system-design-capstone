const models = require('./models');

module.exports = {
  getProducts: async (req, res) => {
    try {
      const page = req.query.page || 1;
      const count = req.query.count || 5;
      const result = await models.getProducts(page, count);
      res.json(result);
    } catch (err) {
      console.error(err);
    }
  },
  getProduct: async (req, res) => {
    const { productId } = req.params;
    console.log(productId);
    const result = await models.getProduct(productId);
    res.json(result);
  },
  getStyles: async (req, res) => {
    const { productId } = req.params;
    console.log(productId);
    const result = await models.getStyles(productId);
    res.json(result);
  },
  getRelated: async (req, res) => {
    const { productId } = req.params;
    console.log(productId);
    const result = await models.getRelated(productId);
    res.json(result);
  },
};
