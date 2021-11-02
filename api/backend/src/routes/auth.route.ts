import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import passport from 'passport';
import AuthService from '@services/auth.service';
import { User } from '@/interfaces/users.interface';
import { TokenData } from '@/interfaces/auth.interface';
import { LoginFormDto } from '@/dtos/login.dto';

class AuthRoute implements Routes {
  public path = '/';
  public router = Router();
  public authController = new AuthController();
  public authService = new AuthService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}signup`, validationMiddleware(CreateUserDto, 'body'), this.authController.signUp);
    this.router.post(`${this.path}login`, validationMiddleware(LoginFormDto, 'body'), this.authController.logIn);
    this.router.post(`${this.path}logout`, authMiddleware, this.authController.logOut);
    this.router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
    this.router.get(
      '/auth/facebook/callback',
      passport.authenticate('facebook', { failureRedirect: 'http://localhost:3000/register' }),
      async function (req, res) {
        const authService = new AuthService();
        const userData: User = req.user;
        const tokenData: TokenData = await authService.createToken(userData);
        console.log(tokenData);
        // res.setHeader('Set-Cookie', [cookie]);
        res.cookie('Authorization', tokenData.token, { maxAge: tokenData.expiresIn });
        res.redirect('http://localhost:3000/');
        // res.redirect('http://localhost:3000/');
      },
    );
  }
}

export default AuthRoute;
