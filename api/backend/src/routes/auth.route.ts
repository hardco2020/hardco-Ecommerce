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
      // passport.authenticate('facebook', { failureRedirect: 'http://localhost:3000/register' }),
      passport.authenticate('facebook', { failureRedirect: '/auth/fail' }),
      async function (req, res) {
        const authService = new AuthService();
        const userData: User = req.user;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const tokenData: TokenData = await authService.createToken(userData);
        // res.setHeader('Set-Cookie', [cookie]);
        // res.send(tokenData);
        // res.cookie('Authorization', tokenData.token, { maxAge: tokenData.expiresIn });
        res.redirect('http://localhost:3000/thirdlogin');
        // res.redirect('http://localhost:3000/');
      },
    );
    this.router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
    this.router.get(
      '/auth/google/callback',
      // passport.authenticate('google', { failureRedirect: 'http://localhost:3000/register' }),
      passport.authenticate('google', { failureRedirect: '/auth/fail' }),
      async function (req, res) {
        const authService = new AuthService();
        const userData: User = req.user;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const tokenData: TokenData = await authService.createToken(userData);
        // res.setHeader('Set-Cookie', [cookie]);
        // res.send(tokenData);
        // res.cookie('Authorization', tokenData.token, { maxAge: tokenData.expiresIn });
        res.redirect('http://localhost:3000/thirdlogin');
        // res.redirect('http://localhost:3000/');
      },
    );
    this.router.get('/auth/success', this.authController.thirdLoginSuccess);
    this.router.get('/auth/fail', this.authController.thirdLoginFail);
  }
}

export default AuthRoute;
