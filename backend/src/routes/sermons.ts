import { Router } from "express";
import {
  createSermon,
  getSermons,
  deleteSermon,
} from "../controllers/sermonController";
import { requireAuth } from "../middleware/auth";

const router = Router();

// POST /api/sermons (protected)
router.post("/", requireAuth, createSermon);

// GET /api/sermons?page=1&limit=10
router.get("/", getSermons);

// DELETE /api/sermons/:id (protected)
router.delete("/:id", requireAuth, deleteSermon);

export default router;
