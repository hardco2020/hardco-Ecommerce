import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { LoginFormDto } from '@dtos/login.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import AuthService from '@services/auth.service';
import EmailService from '@/services/email.service';

class AuthController {
  public authService = new AuthService();
  public emailService = new EmailService();
  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData: User = await this.authService.signup(userData);
      await this.emailService.sendWelcome(userData.username, userData.email);
      //TODO: Send Email to register mail
      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: LoginFormDto = req.body;
      const { cookie, findUser } = await this.authService.login(userData);

      // res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: { findUser, cookie }, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public thirdLoginSuccess = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    if (req.user) {
      //create token
      const token = await this.authService.createToken(req.user);
      res.status(200).json({
        success: true,
        message: 'successfull',
        user: req.user,
        token: token,
        //   cookies: req.cookies
      });
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public thirdLoginFail = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    res.status(401).json({
      success: false,
      message: 'failure',
    });
  };
}

export default AuthController;
