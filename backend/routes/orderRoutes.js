import express from 'express';
// Immediately call express.Router()

const router = express.Router();
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// Note - each route function has several functions chained to it, one for each possible HTTP method (GET, POST, PUT, DELETE, etc.)
// These functions won't be called immediately, they will be set as the callback function for the route
// Some of the routes have middleware, like "protect" and "admin"
router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/mine').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

export default router;
