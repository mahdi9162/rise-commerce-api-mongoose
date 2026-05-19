import { Auth } from '../auth/auth.model';
import { Product } from '../product/product.model';
import { Order } from './order.model';
import type { TCreateOrder, TUpdateOrder } from './order.validation';

// create order
const createOrder = async (payload: TCreateOrder) => {
  // check user
  const user = await Auth.findById(payload.userId);

  if (!user) {
    throw new Error('User not found');
  }

  if (!user.isVerified) {
    throw new Error('Please verify your account before placing an order');
  }

  // total price
  let totalPrice = 0;

  // check is product available
  for (const item of payload.products) {
    const product = await Product.findById(item.productId);

    if (!product) {
      throw new Error('Product not found');
    }

    if (product.stock < item.quantity) {
      throw new Error('Not enough product stock');
    }

    totalPrice += product.price * item.quantity;
  }

  const order = await Order.create({
    ...payload,
    totalPrice,
  });

  return order;
};

// get all orders
const getUserOrders = async (userId: string) => {
  const orders = await Order.find({ userId }).populate('userId', 'name email').populate('products.productId', 'name price stock');

  return orders;
};

// get single order
const getSingleOrder = async (id: string) => {
  const order = await Order.findById(id).populate('userId', 'name email').populate('products.productId', 'name price stock');

  if (!order) {
    throw new Error('Order not found');
  }

  return order;
};

// update order
const updateOrder = async (id: string, payload: TUpdateOrder) => {
  const order = await Order.findById(id);

  if (!order) {
    throw new Error('Order not found');
  }

  if (order.orderStatus !== 'pending') {
    throw new Error('Only pending order can be updated');
  }

  const updatedOrder = await Order.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return updatedOrder;
};

// delete order
const deleteOrder = async (id: string) => {
  const order = await Order.findById(id);

  if (!order) {
    throw new Error('Order not found');
  }

  if (order.orderStatus !== 'pending') {
    throw new Error('Only pending order can be deleted');
  }

  const deletedOrder = await Order.findByIdAndDelete(id);

  return deletedOrder;
};

export const OrderService = {
  createOrder,
  getUserOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
};
