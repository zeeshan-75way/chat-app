import { Request, Response } from 'express';
import * as MessageService from './message.service';
import asyncHandler from 'express-async-handler';

/**
 * Send a message.
 * @route POST /message/send
 * @access private
 */
export const sendMessage = asyncHandler(async (req: Request, res: Response) => {
  const { sender, receiver, content, media } = req.body;

  const message = await MessageService.sendMessage(sender, receiver, content, media);
  res.json({
    success: true,
    message: 'Message sent successfully',
    data: message,
  });
});

/**
 * Get all messages between two users.
 * @route GET /message/conversation/:senderId/:receiverId
 * @access private
 */
export const getMessages = asyncHandler(async (req: Request, res: Response) => {
  const { senderId, receiverId } = req.params;

  const messages = await MessageService.getMessages(senderId, receiverId);
  res.json({
    success: true,
    message: 'Messages retrieved successfully',
    data: messages,
  });
});

/**
 * Update the status of a message.
 * @route PATCH /message/status/:messageId
 * @access private
 */
export const updateMessageStatus = asyncHandler(async (req: Request, res: Response) => {
  const { messageId } = req.params;
  const { status } = req.body;

  const updatedMessage = await MessageService.updateMessageStatus(messageId, status);
  res.json({
    success: true,
    message: 'Message status updated successfully',
    data: updatedMessage,
  });
});
