import { z } from 'zod';

// create order
const createOrderValidationSchema = z.object({
  userId: z.string(),
  products: z.array(
    z.object({
      productId: z.string(),

      quantity: z.number().min(1, 'Quantity must be at least 1'),
    }),
  ),

  shippingAddress: z.string().min(5, 'Shipping address is required'),

  phone: z.string().min(11, 'Phone number is invalid'),
});

// update order
const updateOrderValidationSchema = createOrderValidationSchema.partial();

export const OrderValidation = {
  createOrderValidationSchema,
  updateOrderValidationSchema,
};

// infer types
export type TCreateOrder = z.infer<typeof createOrderValidationSchema>;

export type TUpdateOrder = z.infer<typeof updateOrderValidationSchema>;
