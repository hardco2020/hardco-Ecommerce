import { HttpException } from '@exceptions/HttpException';
import CartModel from '@/models/cart.model';
import { isEmpty } from '@utils/util';
import { CreateCartDto } from '@/dtos/cart.dto';
import { Cart } from '@/interfaces/cart.interface';

class CartService {
  public cart = CartModel;

  public async createCart(CartData: CreateCartDto): Promise<Cart> {
    if (isEmpty(CartData)) throw new HttpException(400, 'CartData is empty');
    const createCartData: Cart = await this.cart.create({ ...CartData });
    return createCartData;
  }
  public async updateCart(CartId: string, CartData: CreateCartDto): Promise<Cart> {
    if (!CartId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new HttpException(409, 'CartId not valid');
    }
    if (isEmpty(CartData)) throw new HttpException(400, 'Update CartData is empty');
    const updateCartById: Cart = await this.cart.findOneAndUpdate({ userId: CartId }, { ...CartData }, { upsert: true, new: true });
    console.log(updateCartById);
    if (!updateCartById) throw new HttpException(409, 'CartData not found');
    return updateCartById;
  }
  public async deleteCart(CartId: string): Promise<Cart> {
    if (!CartId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new HttpException(409, 'CartId not valid');
    }
    const deleteCartById: Cart = await this.cart.findByIdAndDelete(CartId);
    if (!deleteCartById) throw new HttpException(409, 'CartData not found');
    return deleteCartById;
  }
  public async getCart(CartId: string): Promise<Cart> {
    if (!CartId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new HttpException(409, 'CartId not valid');
    }
    const cartData: Cart = await this.cart.findOne({ userId: CartId });
    if (!cartData) throw new HttpException(409, 'CartData not found');
    return cartData;
  }
  public async getAllCart(): Promise<Cart[]> {
    const cartData: Cart[] = await this.cart.find();
    if (!cartData) throw new HttpException(409, 'CartData not found');
    return cartData;
  }
}
export default CartService;
