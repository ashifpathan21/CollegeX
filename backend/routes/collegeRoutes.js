import express from 'express';
import { getStates, getCollegesByState } from '../controllers/collegeController.js';
const router = express.Router();

router.get('/states', getStates);             // /api/colleges/states
router.get('/:state', getCollegesByState);    // /api/colleges/:state

export default router;
