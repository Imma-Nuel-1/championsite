import { Request, Response } from "express";
import Gallery from "../models/Gallery";

export const getGalleryItems = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query["page"] as string) || 1;
    const limit = parseInt(req.query["limit"] as string) || 10;
    const skip = (page - 1) * limit;

    const folders = await Gallery.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Gallery.countDocuments();

    return res.json({
      success: true,
      data: folders,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch gallery folders",
    });
  }
};

export const getGalleryFolderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const folder = await Gallery.findById(id);
    if (!folder) {
      return res.status(404).json({ success: false, message: "Folder not found" });
    }
    return res.json({ success: true, data: folder });
  } catch (err) {
    console.error("Error fetching gallery folder:", err);
    return res.status(500).json({ success: false, message: "Failed to fetch folder" });
  }
};

export const createGalleryFolder = async (req: Request, res: Response) => {
  try {
    const { title, description, category, previewImageUrl, images } = req.body;

    if (
      !title ||
      !previewImageUrl ||
      !Array.isArray(images) ||
      images.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Title, preview image, and at least one image are required.",
      });
    }

    const folder = await Gallery.create({
      title,
      description,
      category,
      previewImageUrl,
      images,
    });

    return res.status(201).json({ success: true, data: folder });
  } catch (err) {
    console.error("Error creating gallery folder:", err);
    return res.status(500).json({
      success: false,
      message: "Error creating gallery folder",
    });
  }
};

export const deleteGalleryFolder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Gallery.findByIdAndDelete(id);

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Folder not found" });
    }

    return res.json({ success: true, message: "Folder deleted" });
  } catch (err) {
    console.error("Error deleting gallery folder:", err);
    return res.status(500).json({
      success: false,
      message: "Error deleting folder",
    });
  }
};
