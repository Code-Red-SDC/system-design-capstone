const { pool } = require('../db/db');

module.exports = {
  getProducts: (page, count) => {
    const start = page * count - count + 1;
    const end = page * count;
    const query = `SELECT * FROM products WHERE id BETWEEN ${start} and ${end}`;
    return pool.query(query);
  },
  getProduct: (productId) => {
    const query = `
    SELECT
      json_build_object(
        'id', id,
        'name', name,
        'slogan', slogan,
        'description', description,
        'category', category,
        'defaultPrice', defaultPrice,
        'createdAt', createdAt,
        'updatedAt', updatedAt,
        'features', (
          SELECT coalesce(json_agg(features), '[]'::json)
          FROM (
            SELECT feature, value
            FROM features
            WHERE productId = p.id
          ) as features
        )
      ) as product
      FROM products p WHERE id=${productId}`;
    return pool.query(query);
  },
  getStyles: (productId) => {
    const query = `
    SELECT json_build_object(
      'product_id', id,
      'results', (
        SELECT coalesce(json_agg(styles), '[]'::json)
        FROM (
          SELECT
          id AS style_id,
          name,
          originalPrice AS original_price,
          salePrice AS sale_price,
          defaultStyle AS "default?",
          (
            SELECT coalesce(json_agg(photos), '[]'::json) AS photos
            FROM (
              SELECT
              thumbnailUrl AS thumbnail_url,
              url
              FROM photos
              WHERE styleId = styles.id
            ) AS photos
          )
          FROM styles
          WHERE productId = p.id
        ) AS styles
      )
    ) AS product
    FROM products p
    WHERE id=${productId}`;
    return pool.query(query);
  },
  getSkus: (styleId) => pool.query(`SELECT id, size, quantity FROM skus WHERE styleId=${styleId}`),
  getRelated: (productId) => {
    const query = `
    SELECT array_agg(relatedId) AS related
    FROM related
    WHERE related.productId = ${productId}`;
    return pool.query(query);
  },
};
