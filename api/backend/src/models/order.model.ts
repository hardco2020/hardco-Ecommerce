import { Order } from '@/interfaces/order.interface';
import { model, Schema, Document } from 'mongoose';

const OrderSchema: Schema = new Schema(
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
    address: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      default: 'pending',
    },
  },
  { timestamps: true },
);

const OrderModel = model<Order & Document>('Order', OrderSchema);

export default OrderModel;
