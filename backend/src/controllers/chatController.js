// controllers/chatController.js
import Chat from "../models/chat.js";
import { getGeminiResponse } from "../utils/gptClient.js";
import { analyzeMood } from "../utils/sentiment.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user.id;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ msg: "Message is required" });
    }

    // fetch recent context (e.g., last 10)
    const recent = await Chat.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    const history = recent
      .reverse()
      .flatMap(doc => ([
        { role: "user", content: doc.message },
        ...(doc.reply ? [{ role: "assistant", content: doc.reply }] : [])
      ]));

    const mood = analyzeMood(message);
    const aiReply = await getGeminiResponse([
      ...history,
      { role: "user", content: message }
    ]);

    const chat = await Chat.create({
      user: req.user.id,
      message,
      reply: aiReply,
      mood
    });

    return res.json({ reply: aiReply, mood });
  } catch (err) {
    console.error("Chat error:", err);
    return res.status(502).json({ msg: "AI service unavailable" });
  }
};

// controllers/chatController.js
export const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // User ke sare chats
    const chats = await Chat.find({ user: userId }).sort({ createdAt: -1 });

    // Mood count
    const moodStats = await Chat.aggregate([
      { $match: { user: userId } },
      { $group: { _id: "$mood", count: { $sum: 1 } } },
    ]);

    res.json({
      totalChats: chats.length,
      recentChats: chats.slice(0, 5), // latest 5 chats
      moodStats,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching dashboard" });
  }
};


export const getMoodStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const moodStats = await Chat.aggregate([
      { $match: { user: userId } },
      { $group: { _id: "$mood", count: { $sum: 1 } } }
    ]);

    res.json(moodStats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
