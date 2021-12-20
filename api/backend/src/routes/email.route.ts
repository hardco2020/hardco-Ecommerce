import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import EmailController from '@/controllers/email.controller';
import authMiddlewareAdmin from '@/middlewares/authAdmin.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import { CreateEmailDto } from '@/dtos/email.dto';

class Email implements Routes {
  public path = '/email';
  public router = Router();
  public emailController = new EmailController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/send`, this.emailController.send);
    this.router.post(`${this.path}/sendAll`, [validationMiddleware(CreateEmailDto, 'body'), authMiddlewareAdmin], this.emailController.sendAll);
  }
}

export default Email;
