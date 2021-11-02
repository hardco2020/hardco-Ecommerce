import { CartProduct } from './cart.interface';

export interface Order {
  userId: string;
  products: CartProduct[];
  amount: Number;
  address: Object;
  status: string;
}
