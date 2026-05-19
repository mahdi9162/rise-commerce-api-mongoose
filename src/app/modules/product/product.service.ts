import { Auth } from '../auth/auth.model';
import type { TCreateProduct, TDeleteProduct, TUpdateProduct } from './product.validation';
import { Product } from './product.model';

// create product
const createProduct = async (payload: TCreateProduct) => {
  const creator = await Auth.findById(payload.createdById);

  if (!creator) {
    throw new Error('Creator not found');
  }

  if (creator.role !== 'admin') {
    throw new Error('Only admin can create product');
  }

  const product = await Product.create(payload);

  return product;
};

// get all product
const getAllProducts = async () => {
  const products = await Product.find();

  return products;
};

// get single product
const getSingleProduct = async (id: string) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new Error('Product not found');
  }

  return product;
};

// update product
const updateProduct = async (id: string, payload: TUpdateProduct) => {
  const updater = await Auth.findById(payload.createdById);

  if (!updater) {
    throw new Error('User not found');
  }

  if (updater.role !== 'admin') {
    throw new Error('Only admin can update product');
  }

  const product = await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new Error('Product not found');
  }

  return product;
};

// delete product
const deleteProduct = async (id: string, payload: TDeleteProduct) => {
  const deleter = await Auth.findById(payload.createdById);

  if (!deleter) {
    throw new Error('User not found');
  }

  if (deleter.role !== 'admin') {
    throw new Error('Only admin can update product');
  }

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    throw new Error('Product not found');
  }

  return product;
};

export const ProductService = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
