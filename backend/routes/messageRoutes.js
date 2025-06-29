import express from 'express';
import { auth } from '../middlewares/auth.js';
import { sendMessage, getMessages } from '../controllers/message.js';

const router = express.Router();

router.post('/send', auth, sendMessage);
router.get('/all', auth, getMessages);

export default router;
