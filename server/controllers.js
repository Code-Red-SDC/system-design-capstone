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
      const product = result[0];
      const features = result[1];
      product.features = features;
      res.json(product);
    } catch (err) {
      res.sendStatus(404);
    }
  },
  getStyles: async (req, res) => {
    try {
      const { productId } = req.params;
      const result = await models.getStyles(productId);
      const styles = result.rows;
      if (styles.length === 0) {
        throw new Error();
      }
      const resultObj = { product_id: productId, results: styles };
      const photoPromises = [];
      const skuPromises = [];
      for (let i = 0; i < styles.length; i += 1) {
        const style = styles[i];
        photoPromises.push(models.getPhotos(style.id));
        skuPromises.push(models.getSkus(style.id));
      }
      const photos = await Promise.all(photoPromises);
      const skus = await Promise.all(skuPromises);
      for (let i = 0; i < styles.length; i += 1) {
        styles[i].photos = photos[i];
        styles[i].skus = {};
        const currSkus = skus[i];
        for (let j = 0; j < currSkus.length; j += 1) {
          const currSku = currSkus[j];
          styles[i].skus[currSku.id] = { quantity: currSku.quantity, size: currSku.size };
        }
      }
      res.json(resultObj);
    } catch (err) {
      res.sendStatus(404);
    }
  },
  getRelated: async (req, res) => {
    try {
      const { productId } = req.params;
      const result = await models.getRelated(productId);
      const related = result.rows;
      if (related.length === 0) {
        throw new Error();
      }
      for (let i = 0; i < related.length; i += 1) {
        related[i] = related[i].relatedid;
      }
      res.json(related);
    } catch (err) {
      res.sendStatus(404);
    }
  },
};
