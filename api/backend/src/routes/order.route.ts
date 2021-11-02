import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import authMiddlewareUser from '@/middlewares/authUser.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddlewareAdmin from '@/middlewares/authAdmin.middleware';
import OrderController from '@/controllers/order.controller';
import { CreateOrderDto } from '@/dtos/order.dto';

class OrderRoute implements Routes {
  public path = '/order';
  public router = Router();
  public orderController = new OrderController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, [validationMiddleware(CreateOrderDto, 'body'), authMiddleware], this.orderController.createNewOrder);
    this.router.put(`${this.path}/:id`, [validationMiddleware(CreateOrderDto, 'body'), authMiddlewareAdmin], this.orderController.updateOrder);
    this.router.delete(`${this.path}/:id`, authMiddlewareAdmin, this.orderController.deleteOrder);
    this.router.get(`${this.path}/:id`, authMiddlewareUser, this.orderController.getUserOrder);
    this.router.get(`${this.path}`, authMiddlewareAdmin, this.orderController.getAllOrder);
    this.router.get(`${this.path}/get/income`, authMiddlewareAdmin, this.orderController.getIncome);
  }
}

export default OrderRoute;
