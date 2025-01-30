import express from 'express';
import * as MessageController from './message.controller';

const router = express.Router();

// Message routes
router.post('/message/send', MessageController.sendMessage);
router.get('/message/conversation/:senderId/:receiverId', MessageController.getMessages);
router.patch('/message/status/:messageId', MessageController.updateMessageStatus);

export default router;
