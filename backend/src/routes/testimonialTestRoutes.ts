// 🗑️ **REVIEW COMMENT**: testimonialTestRoutes is a DEBUG/TEST file that should be removed in production.
// ⚠️ **TEST/DEBUG CODE** - This entire file is only for testing authentication middleware.
//
// RECOMMENDATIONS:
// 1. **DELETE THIS FILE** for production - it's only a test endpoint
// 2. Remove the import and usage from app.ts line 17 and line 53
// 3. This was likely created during debugging and is no longer needed
//
// Current usage in app.ts:
// - Line 17: import testimonialTestRoutes from "./routes/testimonialTestRoutes";
// - Line 53: this.app.use("/api/testimonials-test", testimonialTestRoutes);

import { Router, Response } from "express";
import {
  requireAuth,
  restrictTo,
  UserRole,
  AuthRequest,
} from "../middleware/auth";

const router = Router();

// Test admin testimonials endpoint
router.get(
  "/admin-test",
  requireAuth,
  restrictTo(UserRole.ADMIN),
  (req: AuthRequest, res: Response) => {
    console.log("Admin testimonials test endpoint reached!");
    console.log("User from token:", req.user);

    return res.json({
      success: true,
      message: "Admin testimonials access working!",
      user: req.user,
      timestamp: new Date().toISOString(),
    });
  }
);

export default router;
