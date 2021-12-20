import { NextFunction, Request, Response } from 'express';
import Stripe from 'stripe';
import config from 'config';
import { StripeInterface } from '@/interfaces/stripe.interface';
import OrderService from '@/services/order.service';
import { Cart } from '@/interfaces/cart.interface';
import CartService from '@/services/cart.service';

class StripeController {
  public cartService = new CartService();
  public orderService = new OrderService();
  public StripeKey: StripeInterface = config.get('Stripe');
  public pay = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //TODO:Implement CartData、UserID
      const { tokenId, amount, cart, userId } = req.body;
      // const { total } = amount;
      console.log(cart);
      console.log(userId);
      const user: string = userId;
      const Cart: Cart = cart;
      const stripe = new Stripe(this.StripeKey.key, {
        apiVersion: '2020-08-27',
        typescript: true,
      });
      const charge = await stripe.charges.create({
        source: tokenId,
        amount: amount,
        currency: 'usd',
      });
      //TODO:Use charge to create order
      await this.orderService.createOrder({
        userId: user,
        products: Cart.products,
        quantity: Cart.quantity,
        total: Cart.total,
        status: 'Pending',
        address: charge.billing_details.address.line1,
      });
      //TODO:Empty the Cart
      await this.cartService.updateCart(user, { userId: user, products: [], total: 0, quantity: 0 });
      res.status(200).json({ data: charge, message: 'Payment Received and Order created and Empty Cart' });
    } catch (error) {
      next(error);
    }
  };
}

export default StripeController;
