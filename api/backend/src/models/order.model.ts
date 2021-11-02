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
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: {
      type: Number,
      require: true,
    },
    address: {
      type: Object,
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
