import { Router } from "express";
import { getAdmins, createAdmin, login } from "../controllers/adminController";

const router = Router();

// GET /api/admin — get all admins
router.get("/", getAdmins);

// POST /api/admin — create new admin
router.post("/", createAdmin);

// POST /api/admin/login — admin login
router.post("/login", login);

export default router;
