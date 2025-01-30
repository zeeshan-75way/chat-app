import { IMessage } from "./message.dto";
import Message from "./message.schema";

/**
 * Sends a message from one user to another.
 * @param sender - The user sending the message.
 * @param receiver - The user receiving the message.
 * @param content - The content of the message.
 * @param media - Optional URL for media.
 * @returns The created message object.
 */
export const sendMessage = async (
  sender: string,
  receiver: string,
  content: string,
  media?: string
) => {
  const newMessage = new Message({
    sender,
    receiver,
    content,
    media,
    status: "sent",
  });

  return await newMessage.save();
};

/**
 * Retrieves all messages between two users.
 * @param sender - The user sending the message.
 * @param receiver - The user receiving the message.
 * @returns Array of messages.
 */
export const getMessages = async (sender: string, receiver: string) => {
  return await Message.find({
    $or: [
      { sender, receiver },
      { sender: receiver, receiver: sender },
    ],
  }).sort({ createdAt: 1 });
};

/**
 * Updates the status of a message.
 * @param messageId - The ID of the message to update.
 * @param status - The new status of the message.
 * @returns The updated message.
 */
export const updateMessageStatus = async (
  messageId: string,
  status: string
): Promise<IMessage | null> => {
  const validStatuses = ["sent", "delivered", "read"];
  if (!validStatuses.includes(status)) {
    throw new Error("Invalid status");
  }

  return await Message.findByIdAndUpdate(messageId, { status }, { new: true });
};
