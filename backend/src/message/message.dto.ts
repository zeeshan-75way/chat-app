export interface IMessage extends Document {
  sender: string;
  receiver: string;
  content: string;
  media?: string;
  status: "sent" | "delivered" | "read";
  createdAt: Date;
  updatedAt: Date;
}
