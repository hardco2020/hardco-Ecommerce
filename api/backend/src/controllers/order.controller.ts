import { CreateOrderDto } from '@/dtos/order.dto';
import { Order } from '@/interfaces/order.interface';
import OrderService from '@/services/order.service';
import { NextFunction, Request, Response } from 'express';
class OrderController {
  public orderService = new OrderService();
  public createNewOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const OrderData: CreateOrderDto = req.body;
      const createOrderData: Order = await this.orderService.createOrder(OrderData);
      res.status(201).json({ data: createOrderData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
  public updateOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderId: string = req.params.id;
      const orderData: CreateOrderDto = req.body;
      const updateOrderData: Order = await this.orderService.updateOrder(orderId, orderData);
      res.status(200).json({ data: updateOrderData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
  public deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderId: string = req.params.id;
      const deleteOrderData: Order = await this.orderService.deleteOrder(orderId);
      res.status(200).json({ data: deleteOrderData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
  public getUserOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const OrderId: string = req.params.id;
      const Order = await this.orderService.getOrder(OrderId);
      res.status(200).json({ data: Order, message: 'findUserOrder' });
    } catch (error) {
      next(error);
    }
  };
  public getAllOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let order: Order[];
      const query = req.query.new;
      if (query) {
        order = await this.orderService.getLatestOrder();
      } else {
        order = await this.orderService.getAllOrder();
      }
      res.status(200).json({ data: order, message: 'findUserOrder' });
    } catch (error) {
      next(error);
    }
  };
  public getIncome = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pid: string = req.query.pid as string;
      let Income;
      if (pid) {
        Income = await this.orderService.getIncome(pid);
      } else {
        Income = await this.orderService.getIncome();
      }
      res.status(200).json({ data: Income, message: 'findIncome' });
    } catch (error) {
      next(error);
    }
  };
}

export default OrderController;
