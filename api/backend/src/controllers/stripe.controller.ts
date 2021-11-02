import { NextFunction, Request, Response } from 'express';
import Stripe from 'stripe';
import config from 'config';
import { StripeInterface } from '@/interfaces/stripe.interface';

class StripeController {
  public StripeKey: StripeInterface = config.get('Stripe');
  public pay = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { tokenId, amount } = req.body;
      const stripe = new Stripe(this.StripeKey.key, {
        apiVersion: '2020-08-27',
        typescript: true,
      });
      const charge = await stripe.charges.create({
        source: tokenId,
        amount: amount,
        currency: 'usd',
      });
      res.status(200).json({ data: charge, message: 'Payment Received' });
    } catch (error) {
      next(error);
    }
  };
}

export default StripeController;
