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
    const result = await models.getProduct(productId);
    const product = result[0];
    const features = result[1];
    product.features = features;
    res.json(product);
  },
  getStyles: async (req, res) => {
    const { productId } = req.params;
    const result = await models.getStyles(productId);
    const resultObj = { product_id: productId, results: result };
    const photoPromises = [];
    const skuPromises = [];
    for (let i = 0; i < result.length; i += 1) {
      const style = result[i];
      photoPromises.push(models.getPhotos(style.id));
      skuPromises.push(models.getSkus(style.id));
    }
    const photos = await Promise.all(photoPromises);
    const skus = await Promise.all(skuPromises);
    for (let i = 0; i < result.length; i += 1) {
      result[i].photos = photos[i];
      result[i].skus = {};
      const currSkus = skus[i];
      for (let j = 0; j < currSkus.length; j += 1) {
        const currSku = currSkus[j];
        result[i].skus[currSku.id] = { quantity: currSku.quantity, size: currSku.size };
      }
    }
    res.json(resultObj);
  },
  getRelated: async (req, res) => {
    const { productId } = req.params;
    const result = await models.getRelated(productId);
    for (let i = 0; i < result.length; i += 1) {
      result[i] = result[i].relatedid;
    }
    res.json(result);
  },
};
