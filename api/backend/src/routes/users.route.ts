import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import { Routes } from '@interfaces/routes.interface';
import authMiddlewareAdmin from '@/middlewares/authAdmin.middleware';
import authMiddlewareUser from '@/middlewares/authUser.middleware';
class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddlewareAdmin, this.usersController.getUsers);
    this.router.get(`${this.path}/:id`, authMiddlewareAdmin, this.usersController.getUserById); //沒有設定錯誤value的話該怎麼辦
    this.router.post(`${this.path}`, this.usersController.createUser);
    this.router.put(`${this.path}/:id`, authMiddlewareUser, this.usersController.updateUser);
    this.router.delete(`${this.path}/:id`, authMiddlewareAdmin, this.usersController.deleteUser);
    this.router.get(`${this.path}/find/stats`, authMiddlewareAdmin, this.usersController.getUserStats);
  }
}

export default UsersRoute;
