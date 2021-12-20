/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import EmailService from '@/services/email.service';


class EmailController {
  public emailService = new EmailService();
  public send = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const name = req.body.name || '';
      const email = req.body.email;
      const messageId = this.emailService.sendWelcome(name,email);
      res.status(200).json({ message: 'Mail send', message_id: messageId });
    } catch (error) {
      next(error);
    }
  };
  public sendAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const message = req.body.message;
      const messageId = this.emailService.sendAll(message);
      res.status(200).json({ message: 'Mail send', message_id: messageId });
    } catch (error) {
      next(error);
    }
  };
}

export default EmailController;
