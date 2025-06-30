import express from 'express';
import { auth } from '../middlewares/auth.js';
import { sendMessage, getMessages , markMessagesAsSeen} from '../controllers/message.js';

const router = express.Router();

router.post('/send', auth, sendMessage);
router.get('/all', auth, getMessages);
router.post('/seen', auth, markMessagesAsSeen);

export default router;
