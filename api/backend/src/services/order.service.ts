import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import OrderModel from '@/models/order.model';
import { CreateOrderDto } from '@/dtos/order.dto';
import { Order } from '@/interfaces/order.interface';

class OrderService {
  public order = OrderModel;

  public async createOrder(OrderData: CreateOrderDto): Promise<Order> {
    if (isEmpty(OrderData)) throw new HttpException(400, 'OrderData is empty');
    const createOrderData: Order = await this.order.create({ ...OrderData });
    return createOrderData;
  }
  public async updateOrder(OrderId: string, OrderData: CreateOrderDto): Promise<Order> {
    if (!OrderId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new HttpException(409, 'OrderId not valid');
    }
    if (isEmpty(OrderData)) throw new HttpException(400, 'Update OrderData is empty');
    const updateOrderById: Order = await this.order.findByIdAndUpdate(OrderId, { ...OrderData }, { new: true });
    console.log(updateOrderById);
    if (!updateOrderById) throw new HttpException(409, 'OrderData not found');
    return updateOrderById;
  }
  public async deleteOrder(OrderId: string): Promise<Order> {
    if (!OrderId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new HttpException(409, 'OrderId not valid');
    }
    const deleteOrderById: Order = await this.order.findByIdAndDelete(OrderId);
    if (!deleteOrderById) throw new HttpException(409, 'OrderData not found');
    return deleteOrderById;
  }
  public async getOrder(OrderId: string): Promise<Order[]> {
    if (!OrderId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new HttpException(409, 'OrderId not valid');
    }
    const OrderData: Order[] = await this.order.find({ userId: OrderId }).sort([['createdAt', -1]]);
    if (!OrderData) throw new HttpException(409, 'OrderData not found');
    return OrderData;
  }
  public async getAllOrder(): Promise<Order[]> {
    const OrderData: Order[] = await this.order.find();
    if (!OrderData) throw new HttpException(409, 'OrderData not found');
    return OrderData;
  }
  public async getLatestOrder(): Promise<Order[]> {
    const orders: Order[] = await this.order.find().sort({ _id: -1 }).limit(5);
    if (!orders) throw new HttpException(409, 'OrderData not found');
    return orders;
  }
  public async getIncome(productId?: string) {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    //const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    const income = await this.order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
        },
      },
      {
        $project: {
          month: { $month: '$createdAt' },
          sales: '$total',
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: '$sales' },
        },
      },
      {
        $sort: { _id: -1 },
      },
    ]);
    return income;
  }
}
export default OrderService;
