import express from 'express';
// Immediately call express.Router()
const router = express.Router();
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

// Connect the root route to the getProducts controller
router.route('/').get(getProducts).post(protect, admin, createProduct);

// Connect a route with a product id to the getProductById controller
router.route('/:id/reviews').post(protect, checkObjectId, createProductReview);

router.get('/top', getTopProducts);

router
  .route('/:id')
  .get(checkObjectId, getProductById)
  .put(protect, admin, checkObjectId, updateProduct)
  .delete(protect, admin, checkObjectId, deleteProduct);

export default router;
