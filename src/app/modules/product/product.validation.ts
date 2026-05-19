import { z } from 'zod';

const createProductValidationSchema = z.object({
  name: z.string().min(2, 'Product name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().positive('Price must be greater than 0'),
  stock: z.number().int().min(0, 'Stock cannot be negative'),
  createdById: z.string().min(1, 'Creator id is required'),
});

const updateProductValidationSchema = createProductValidationSchema.partial();

const deleteProductValidationSchema = z.object({
  createdById: z.string(),
});

export const ProductValidation = {
  createProductValidationSchema,
  updateProductValidationSchema,
};

export type TCreateProduct = z.infer<typeof createProductValidationSchema>;
export type TUpdateProduct = z.infer<typeof updateProductValidationSchema>;
export type TDeleteProduct = z.infer<typeof deleteProductValidationSchema>;
