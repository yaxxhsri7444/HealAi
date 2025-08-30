import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    reply: { type: String },
    mood: {
      type: String,
      enum: ["sad", "happy", "neutral"],
      default: "neutral",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Chat", chatSchema);
