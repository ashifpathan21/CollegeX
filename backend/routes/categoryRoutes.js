import express from 'express';

import { getCategories  , seedCategories} from '../controllers/category.js';

import { auth , isAdmin  } from '../middlewares/auth.js';

const router = express.Router();

router.post('/seed', auth , isAdmin ,  seedCategories); // Use once
router.get('/', getCategories);       // Use anytime

export default router;
