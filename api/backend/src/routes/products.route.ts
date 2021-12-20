import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
// import authMiddleware from '@/middlewares/auth.middleware';
import authMiddlewareAdmin from '@/middlewares/authAdmin.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateProductDto, UpdateProductDTO } from '@/dtos/products.dto';
import ProductsController from '@/controllers/products.controller';

class ProductsRoute implements Routes {
  public path = '/products';
  public router = Router();
  public productsController = new ProductsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, [validationMiddleware(CreateProductDto, 'body'), authMiddlewareAdmin], this.productsController.createNewProduct);
    this.router.put(`${this.path}/:id`, [validationMiddleware(UpdateProductDTO, 'body'), authMiddlewareAdmin], this.productsController.updateProduct);
    this.router.delete(`${this.path}/:id`, authMiddlewareAdmin, this.productsController.deleteProduct);
    this.router.get(`${this.path}`, this.productsController.getProductPage);
    this.router.get(`${this.path}/:id`, this.productsController.getProductId);
    this.router.get(`${this.path}/search/:name`, this.productsController.searchProduct);
  }
}
export default ProductsRoute;
