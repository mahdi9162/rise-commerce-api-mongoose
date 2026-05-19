import { Router } from 'express';
import validateRequest from '../../middleware/validateSchema';
import { ProductValidation } from './product.validation';
import { ProductController } from './product.controller';

const router: Router = Router();

// create product
router.post('/', validateRequest(ProductValidation.createProductValidationSchema), ProductController.createProduct);

// get all products
router.get('/', ProductController.getAllProducts);

// get single product
router.get('/:id', ProductController.getSingleProduct);

// update product
router.patch('/:id', validateRequest(ProductValidation.updateProductValidationSchema), ProductController.updateProduct);

// delete product
router.delete('/:id', ProductController.deleteProduct);

export const ProductRoutes = router;
