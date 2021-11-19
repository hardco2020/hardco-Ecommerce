import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
// import authMiddleware from '@/middlewares/auth.middleware';
// import authMiddlewareUser from '@/middlewares/authUser.middleware';
// import validationMiddleware from '@middlewares/validation.middleware';
// import authMiddlewareAdmin from '@/middlewares/authAdmin.middleware';
import StripeController from '@/controllers/stripe.controller';
import authMiddlewareUser from '@/middlewares/authUser.middleware';
import authMiddleware from '@/middlewares/auth.middleware';

class StripeRoute implements Routes {
  public path = '/stripe';
  public router = Router();
  public stripeController = new StripeController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/payment`, this.stripeController.pay);
  }
}

export default StripeRoute;
