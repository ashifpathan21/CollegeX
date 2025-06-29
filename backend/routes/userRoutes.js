import express from 'express';
import { auth } from '../middlewares/auth.js';
import { login, signup, sendotp , getProfile } from '../controllers/user.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/send-otp', sendotp);
router.post('/profile',  auth , getProfile);

// Optional: Add user search, update profile, friend list routes here

export default router;
