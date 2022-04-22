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