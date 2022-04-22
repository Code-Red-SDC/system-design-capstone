const supertest = require('supertest');
const { createServer } = require('../server');

const app = createServer();

describe('products', () => {
  describe('get products route', () => {
    describe('given query with no params', () => {
      it('should return a 200 response code and 5 products as array', async () => {
        const { body, statusCode } = await supertest(app).get(`/products`);

        expect(statusCode).toBe(200);
        expect(body.length).toBe(5);
        expect(Array.isArray(body)).toBe(true);
      });
      it('first element should have id of 1 and last element should have id of 5', async () => {
        const { body } = await supertest(app).get('/products');

        expect(body[0].id).toBe(1);
        expect(body[body.length - 1].id).toBe(5);
      });
    });
    describe('given query with count of 10', () => {
      it('should return a 200 response code and 10 products as array', async () => {
        const { body, statusCode } = await supertest(app).get('/products?count=10');

        expect(statusCode).toBe(200);
        expect(body.length).toBe(10);
        expect(Array.isArray(body)).toBe(true);
      });
      it('first element should have id of 1 and last element should have id of 1000', async () => {
        const { body } = await supertest(app).get('/products?count=1000');

        expect(body[0].id).toBe(1);
        expect(body[body.length - 1].id).toBe(1000);
      });
    });
  });
});

describe('product', () => {
  describe('get product by product id route', () => {
    describe('given a query with an invalid product id', () => {
      it('should return a 404 response code if product does not exist', async () => {
        await supertest(app).get('/products/543214581').expect(404);
      });
    });
    describe('given a query with a valid product id', () => {
      const productId = 173451;
      it('should return a 200 response code and object matching product id', async () => {
        const { body, statusCode } = await supertest(app).get(`/products/${productId}`);

        expect(statusCode).toBe(200);
        expect(typeof body).toBe('object');
        expect(body.id).toEqual(productId);
      });
      it('should return an object with property called features', async () => {
        const { body } = await supertest(app).get(`/products/${productId}`);

        expect(body.features).toBeDefined();
      });
      it('should have an array of features objects on property features', async () => {
        const { body } = await supertest(app).get(`/products/${productId}`);

        expect(Array.isArray(body.features)).toBe(true);
        expect(typeof body.features[0]).toBe('object');
      });
    });
  });
});

describe('styles', () => {
  describe('get styles by product id route', () => {
    describe('given a query with an invalid product id', () => {
      it('should return a 404 response code if product does not exist', async () => {
        await supertest(app).get('/products/543214581/styles').expect(404);
      });
    });
    describe('given a query with a valid product id', () => {
      const productId = 1000001;
      it('should return a 200 response code and object matching product id', async () => {
        const { body, statusCode } = await supertest(app).get(`/products/${productId}/styles`);

        expect(statusCode).toBe(200);
        expect(typeof body).toBe('object');
        expect(body.product_id).toEqual(String(productId));
      });
      it('should return an object with property called results', async () => {
        const { body } = await supertest(app).get(`/products/${productId}/styles`);

        expect(body.results).toBeDefined();
      });
      it('should have an array of styles objects on property results', async () => {
        const { body } = await supertest(app).get(`/products/${productId}/styles`);

        expect(Array.isArray(body.results)).toBe(true);
        expect(typeof body.results[0]).toBe('object');
      });
      it('each style should have properties skus and photos', async () => {
        const { body } = await supertest(app).get(`/products/${productId}/styles`);

        body.results.forEach((style) => {
          expect(style.photos).toBeDefined();
          expect(style.skus).toBeDefined();
        });
      });
      it('should have an array of photos for each style', async () => {
        const { body } = await supertest(app).get(`/products/${productId}/styles`);

        body.results.forEach((style) => {
          expect(Array.isArray(style.photos)).toBe(true);
        });
      });
      it('should have an object of skus for each style', async () => {
        const { body } = await supertest(app).get(`/products/${productId}/styles`);

        body.results.forEach((style) => {
          expect(typeof style.skus).toBe('object');
        })
      });
    });
  });
});

describe('related', () => {
  describe('get related by product id route', () => {
    describe('given a query with an invalid product id', () => {
      it('should return a 404 response code if product does not exist', async () => {
        await supertest(app).get('/products/2093842034/related').expect(404);
      });
    });
    describe('given a query with a valid product id', () => {
      const productId = 1000001;
      it('should return a 200 response code and array of related products', async () => {
        const { body, statusCode } = await supertest(app).get(`/products/${productId}/related`);

        expect(statusCode).toEqual(200);
        expect(Array.isArray(body)).toBe(true);
      });
      it('should return related product IDs as numbers', async () => {
        const { body } = await supertest(app).get(`/products/${productId}/related`);

        body.forEach((item) => {
          expect(typeof item).toBe('number');
        });
      });
      it('should have related products of 238174, 432790, 976869, and 638864 for product id 1000001', async () => {
        const relatedProducts = [238174, 432790, 976869, 638864];

        const { body } = await supertest(app).get(`/products/${productId}/related`);

        body.forEach((productId, index) => {
          expect(productId).toEqual(relatedProducts[index]);
        });
      });
    });
  });
});