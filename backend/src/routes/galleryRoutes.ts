import express from "express";
import {
  getGalleryItems,
  getGalleryFolderById,
  createGalleryFolder,
  deleteGalleryFolder,
} from "../controllers/galleryController";
import { requireAuth } from "../middleware/auth";

const router = express.Router();

// Public
router.get("/", getGalleryItems);
router.get("/:id", getGalleryFolderById);

// Admin
router.post("/", requireAuth, createGalleryFolder);
router.delete("/:id", requireAuth, deleteGalleryFolder);

export default router;
