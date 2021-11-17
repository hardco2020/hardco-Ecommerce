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
        product: {
          _id: {
            type: String,
          },
          title: {
            type: String,
          },
          desc: {
            type: String,
          },
          img: {
            type: String,
          },
          categories: {
            type: Array,
          },
          price: {
            type: Number,
          },
          createdAt: {
            type: String,
          },
          updatedAt: {
            type: String,
          },
          size: {
            type: String,
          },
          color: {
            type: String,
          },
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    quantity: {
      type: Number,
    },
    total: {
      type: Number,
    },
  },
  { timestamps: true },
);

const CartModel = model<Cart & Document>('Cart', CartSchema);

export default CartModel;
