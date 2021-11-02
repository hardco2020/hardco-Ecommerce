import { Cart } from '@/interfaces/cart.interface';
import { model, Schema, Document } from 'mongoose';

const CartSchema: Schema = new Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true },
);

const CartModel = model<Cart & Document>('Cart', CartSchema);

export default CartModel;
