import { Router } from "express";
import {
  getEvents,
  getEventById,
  getEventICS,
  createEvent,
  updateEvent,
  deleteEvent,
  getUpcomingEvents,
} from "../controllers/eventController";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/", getEvents);
router.get("/upcoming", getUpcomingEvents);
router.get("/:id", getEventById);
router.get("/:id/ics", getEventICS);
router.post("/", requireAuth, createEvent);
router.put("/:id", requireAuth, updateEvent);
router.delete("/:id", requireAuth, deleteEvent);

export default router;
