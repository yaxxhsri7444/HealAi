import express from "express";
import { sendMessage, getDashboard, getMoodStats} from "../controllers/chatController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Protected route → user must be logged in
router.post("/send",authMiddleware ,sendMessage);
router.get("/dashboard",authMiddleware,getDashboard);
router.get("/mood-stats",authMiddleware, getMoodStats);


export default router;
