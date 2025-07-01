import express from 'express';
import { getStates, getLocation } from '../controllers/collegeController.js';
const router = express.Router();

router.get('/states', getStates);             // /api/colleges/states
router.get('/:query', getLocation);    // /api/colleges/:state

export default router;
