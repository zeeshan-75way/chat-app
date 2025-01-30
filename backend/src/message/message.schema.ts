
import mongoose, { Schema } from "mongoose";
const messageSchema: Schema = new Schema(
  {
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    content: { type: String, required: true },
    media: { type: String, default: '' },
    status: { type: String, enum: ['sent', 'delivered', 'read'], default: 'sent' },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Message", messageSchema);
