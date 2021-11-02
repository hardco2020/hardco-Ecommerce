import CartService from '@/services/cart.service';
import { NextFunction, Request, Response } from 'express';
import { CreateCartDto } from '@/dtos/cart.dto';
import { Cart } from '@/interfaces/cart.interface';
class CartController {
  public cartService = new CartService();
  public createNewCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cartData: CreateCartDto = req.body;
      const createCartData: Cart = await this.cartService.createCart(cartData);
      res.status(201).json({ data: createCartData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
  public updateCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cartId: string = req.params.id;
      const cartData: CreateCartDto = req.body;
      const updateCartData: Cart = await this.cartService.updateCart(cartId, cartData);
      res.status(200).json({ data: updateCartData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
  public deleteCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cartId: string = req.params.id;
      const deletecartData: Cart = await this.cartService.deleteCart(cartId);
      res.status(200).json({ data: deletecartData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
  public getUserCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cartId: string = req.params.id;
      const cart = await this.cartService.getCart(cartId);
      res.status(200).json({ data: cart, message: 'findUserCart' });
    } catch (error) {
      next(error);
    }
  };
  public getAllCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cart = await this.cartService.getAllCart();
      res.status(200).json({ data: cart, message: 'findUserCart' });
    } catch (error) {
      next(error);
    }
  };
}

export default CartController;
