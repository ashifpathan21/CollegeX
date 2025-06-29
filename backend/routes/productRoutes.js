import express from 'express';
import { auth } from '../middlewares/auth.js';
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getMyProducts ,
  getAllProducts
} from '../controllers/product.js';

const router = express.Router();

router.post('/', auth, createProduct);
router.put('/:productId', auth, updateProduct);
router.delete('/:productId', auth, deleteProduct);
router.get('/my', auth, getMyProducts);
router.get('/getAllProduct', getAllProducts);

// Optional: route to get all products or filter products
export default router;
