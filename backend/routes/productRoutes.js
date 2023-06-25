import express from 'express';
// Immediately call express.Router()
const router = express.Router();
import {
  getProducts,
  getProductById,
} from '../controllers/productController.js';

// Connect the root route to the getProducts controller
router.route('/').get(getProducts);

// Connect a route with a product id to the getProductById controller
router.route('/:id').get(getProductById);

export default router;
