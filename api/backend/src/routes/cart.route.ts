import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import authMiddlewareUser from '@/middlewares/authUser.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import CartController from '@/controllers/cart.controller';
import { CreateCartDto } from '@/dtos/cart.dto';
import authMiddlewareAdmin from '@/middlewares/authAdmin.middleware';

class CartRoute implements Routes {
  public path = '/cart';
  public router = Router();
  public cartController = new CartController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, [validationMiddleware(CreateCartDto, 'body'), authMiddleware], this.cartController.createNewCart);
    this.router.put(`${this.path}/:id`, [validationMiddleware(CreateCartDto, 'body'), authMiddlewareUser], this.cartController.updateCart);
    this.router.delete(`${this.path}/:id`, authMiddlewareUser, this.cartController.deleteCart);
    this.router.get(`${this.path}/:id`, authMiddlewareUser, this.cartController.getUserCart);
    this.router.get(`${this.path}`, authMiddlewareAdmin, this.cartController.getAllCart);
  }
}

export default CartRoute;
