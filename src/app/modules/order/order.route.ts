import { Router } from 'express';
import validateRequest from '../../middleware/validateSchema';
import { OrderController } from './order.controller';
import { OrderValidation } from './order.validation';

const router: Router = Router();

// create order
router.post('/', validateRequest(OrderValidation.createOrderValidationSchema), OrderController.createOrder);

// get all my orders
router.get('/my-orders/:userId', OrderController.getUserOrders);

// get single my order
router.get('/my-orders/:id', OrderController.getSingleOrder);

// update my order
router.patch('/:id', validateRequest(OrderValidation.updateOrderValidationSchema), OrderController.updateOrder);

// delete my order
router.delete('/:id', OrderController.deleteOrder);

export const OrderRoutes = router;
