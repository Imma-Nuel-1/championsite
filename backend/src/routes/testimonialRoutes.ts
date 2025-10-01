import { Router } from "express";
import {
  createTestimonial,
  getApprovedTestimonials,
  getAllTestimonials,
  approveTestimonial,
  rejectTestimonial,
  deleteTestimonial,
} from "../controllers/testimonialController";
import { requireAuth, restrictTo, UserRole } from "../middleware/auth";

const router = Router();

// Public routes
router.route("/").post(createTestimonial).get(getApprovedTestimonials);

// Admin routes
router
  .route("/admin")
  .get(requireAuth, restrictTo(UserRole.ADMIN), getAllTestimonials);
router
  .route("/admin/:id/approve")
  .put(requireAuth, restrictTo(UserRole.ADMIN), approveTestimonial);
router
  .route("/admin/:id/reject")
  .put(requireAuth, restrictTo(UserRole.ADMIN), rejectTestimonial);
router
  .route("/admin/:id")
  .delete(requireAuth, restrictTo(UserRole.ADMIN), deleteTestimonial);

export default router;
