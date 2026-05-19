import type { Request, Response } from 'express';
import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { ApiResponse } from '../../utils/apiResponse';
import { ProductService } from './product.service';

// create product
const createProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.createProduct(req.body);

  ApiResponse.success(res, result, 'Product created successfully', status.CREATED);
});

// get all products
const getAllProducts = catchAsync(async (_req: Request, res: Response) => {
  const result = await ProductService.getAllProducts();

  ApiResponse.success(res, result, 'Products retrieved successfully', status.OK);
});

// get single product
const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const productId = req.params.id as string;

  const result = await ProductService.getSingleProduct(productId);

  ApiResponse.success(res, result, 'Product retrieved successfully', status.OK);
});

// update product
const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const productId = req.params.id as string;

  const result = await ProductService.updateProduct(productId, req.body);

  ApiResponse.success(res, result, 'Product updated successfully', status.OK);
});

// delete product
const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const productId = req.params.id as string;

  const result = await ProductService.deleteProduct(productId, req.body);

  ApiResponse.success(res, result, 'Product deleted successfully', status.OK);
});

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
