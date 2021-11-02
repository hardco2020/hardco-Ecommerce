import mongoose from 'mongoose';
import request from 'supertest';
import App from '@/app';
import ProductRoute from '@routes/products.route';
import { CreateProductDto } from '@/dtos/products.dto';

jest.mock('@middlewares/authAdmin.middleware', () =>
  jest.fn((req, res, next) => {
    return next();
  }),
);
afterAll(async () => {
  // await mongoose.connection.db.dropDatabase();
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Product', () => {
  describe('[POST] /', () => {
    it('Response create productData', async () => {
      //   const authMiddleware = jest.fn((req, res, next) => {
      //     next();
      //   });
      //   const authMiddlewareAdmin = jest.fn((req, res, next) => {
      //     next();
      //   });
      const productData: CreateProductDto = {
        title: '好棒棒T-shirt2',
        desc: '穿了直接好棒棒',
        img: '',
        categories: ['T-shirt'],
        size: 'M',
        color: 'green',
        price: 300,
      };
      const productRoute = new ProductRoute();
      const products = productRoute.productsController.productsService.products;
      products.create = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        ...productData,
      });
      (mongoose as any).connect = jest.fn();

      const app = new App([productRoute]);
      const response = await request(app.getServer()).post(`${productRoute.path}`).send(productData);
      console.log(response.body);
      // console.log(response.text);
      expect(response.statusCode).toBe(201); //create successful
    });
  });
  describe('[PUT] /:Id', () => {
    it('Response update productData', async () => {
      const productId = '617aa9ce128c12bd16f13401'; // mock userId
      const productData: CreateProductDto = {
        title: '好棒棒T-shirt2',
        desc: '穿了直接好笨笨',
        img: '',
        categories: ['T-shirt'],
        size: 'M',
        color: 'green',
        price: 300,
      };
      const productRoute = new ProductRoute();
      const products = productRoute.productsController.productsService.products;
      products.findByIdAndUpdate = jest.fn().mockReturnValue({
        ...productData,
      });
      (mongoose as any).connect = jest.fn();
      const app = new App([productRoute]);
      const response = await request(app.getServer()).put(`${productRoute.path}/${productId}`).send(productData);
      expect(response.body).toHaveProperty('data', productData);
      expect(response.statusCode).toBe(200);
    });
  });
  describe('[DELETE] /:Id', () => {
    it('Response delete productData', async () => {
      const productId = '617aa9ce128c12bd16f13401';
      const productRoute = new ProductRoute();
      const products = productRoute.productsController.productsService.products;
      products.findByIdAndDelete = jest.fn().mockReturnValue({
        _id: productId,
      });
      (mongoose as any).connect = jest.fn();
      const app = new App([productRoute]);
      const response = await request(app.getServer()).delete(`${productRoute.path}/${productId}`);
      expect(response.statusCode).toBe(200);
    });
    it('Response Invalid productId', async () => {
      const productId = 'invalid';
      const productRoute = new ProductRoute();
      const products = productRoute.productsController.productsService.products;
      products.findByIdAndDelete = jest.fn().mockReturnValue({
        _id: productId,
      });
      (mongoose as any).connect = jest.fn();
      const app = new App([productRoute]);
      const response = await request(app.getServer()).delete(`${productRoute.path}/${productId}`);
      expect(response.statusCode).toBe(409);
    });
  });
  describe('[GET]', () => {
    it('Response find productData', async () => {
      //還沒有test query的
      const productRoute = new ProductRoute();
      const products = productRoute.productsController.productsService.products;

      products.find = jest.fn().mockReturnValue([
        {
          _id: 'qpwoeiruty',
        },
        {
          _id: 'qpwoeiruty',
        },
        {
          _id: 'qpwoeiruty',
        },
      ]);

      (mongoose as any).connect = jest.fn();
      const app = new App([productRoute]);
      const response = await request(app.getServer()).get(`${productRoute.path}`);
      expect(response.statusCode).toBe(200);
    });
  });
});
