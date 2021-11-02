import { NextFunction, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { RequestWithUser } from '@interfaces/auth.interface';
import authMiddleware from './auth.middleware';

const authMiddlewareUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  authMiddleware(req, res, () => {
    if (req.user) {
      console.log('Passed middleware');
    } else {
      next(new HttpException(401, 'You are not allowed to do that!'));
    }
    if (req.user._id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      next(new HttpException(401, 'You are not allowed to do that!'));
    }
  });
};

export default authMiddlewareUser;
