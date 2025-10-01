// src/routes/index.ts
import { Router, Request, Response } from "express";
import authRouter from "./auth"; // make sure this exists
import sermonRouter from "./sermons"; // make sure this exists
import eventRouter from "./events"; // make sure this exists
import adminRouter from "./admin"; // ✅ this is the correct router now

const router = Router();

// Public + API routes
router.use("/auth", authRouter);
router.use("/sermons", sermonRouter);
router.use("/events", eventRouter);
router.use("/admin", adminRouter); // ✅ correct usage now

// Health check
router.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

export default router;
