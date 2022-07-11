import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    from: {
      type: String,
      required: true,
      ref: "User",
      trim: true,
    },
    to: {
      type: String,
      required: true,
      ref: "User",
      trim: true,
    },
    message: {
      type: String,
      required: "Create some ontent for your post",
    },
    created_at: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.models.Chat || mongoose.model('Chat', chatSchema)

export default Chat
