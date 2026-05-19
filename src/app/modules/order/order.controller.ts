import type { Request, Response } from 'express';
import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { ApiResponse } from '../../utils/apiResponse';
import { OrderService } from './order.service';

// create order
const createOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.createOrder(req.body);

  ApiResponse.success(res, result, 'Order created successfully', status.CREATED);
});

// get all orders
const getUserOrders = catchAsync(async (req, res) => {
  const userId = req.params.userId as string;

  const result = await OrderService.getUserOrders(userId);

  ApiResponse.success(res, result, 'User orders retrieved successfully', status.OK);
});

// get single order
const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;

  const result = await OrderService.getSingleOrder(id);

  ApiResponse.success(res, result, 'Order retrieved successfully', status.OK);
});

// update order
const updateOrder = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;

  const result = await OrderService.updateOrder(id, req.body);

  ApiResponse.success(res, result, 'Order updated successfully', status.OK);
});

// delete order
const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;

  const result = await OrderService.deleteOrder(id);

  ApiResponse.success(res, result, 'Order deleted successfully', status.OK);
});

export const OrderController = {
  createOrder,
  getUserOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
};
