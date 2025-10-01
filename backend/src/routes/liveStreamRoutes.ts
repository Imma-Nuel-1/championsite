import { Router } from "express";
import {
  getLiveStream,
  createLiveStream,
  updateLiveStream,
  deleteLiveStream,
  getAllLiveStreams,
  toggleLiveStreamStatus,
} from "../controllers/liveStreamController";
import { requireAuth } from "../middleware/auth";

const router = Router();

// Public routes
router.get("/", getLiveStream);

// Admin routes (protected)
router.get("/all", requireAuth, getAllLiveStreams);
router.post("/", requireAuth, createLiveStream);
router.put("/:id", requireAuth, updateLiveStream);
router.delete("/:id", requireAuth, deleteLiveStream);
router.patch("/:id/toggle", requireAuth, toggleLiveStreamStatus);

export default router;
