import { Request, Response } from "express";
import LiveStream from "../models/LiveStream";
import { asyncHandler } from "../middleware/asyncHandler";

// Get active live stream
export const getLiveStream = asyncHandler(
  async (_req: Request, res: Response) => {
    const liveStream = await LiveStream.findOne({ isActive: true }).sort({
      createdAt: -1,
    });

    if (!liveStream) {
      return res.status(404).json({
        success: false,
        message: "No active live stream found",
      });
    }

    return res.status(200).json({
      success: true,
      data: liveStream,
    });
  }
);

// Create or update live stream (Admin only)
export const createLiveStream = asyncHandler(
  async (req: Request, res: Response) => {
    const { title, youtubeUrl, scheduledTime, description, thumbnail } =
      req.body;

    if (!youtubeUrl) {
      res.status(400);
      throw new Error("YouTube URL is required");
    }

    // Deactivate all other live streams first
    await LiveStream.updateMany({}, { isActive: false });

    // Create new live stream
    const liveStream = new LiveStream({
      title: title || "Sunday Service Live",
      youtubeUrl,
      scheduledTime,
      description: description || "Join us for worship and the Word!",
      thumbnail,
      isActive: true,
    });

    await liveStream.save();

    return res.status(201).json({
      success: true,
      message: "Live stream created successfully",
      data: liveStream,
    });
  }
);

// Update live stream (Admin only)
export const updateLiveStream = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;

    const liveStream = await LiveStream.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!liveStream) {
      res.status(404);
      throw new Error("Live stream not found");
    }

    return res.status(200).json({
      success: true,
      data: liveStream,
    });
  }
);

// Delete live stream (Admin only)
export const deleteLiveStream = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const liveStream = await LiveStream.findByIdAndDelete(id);

    if (!liveStream) {
      res.status(404);
      throw new Error("Live stream not found");
    }

    return res.status(200).json({
      success: true,
      message: "Live stream deleted successfully",
    });
  }
);

// Get all live streams (Admin only)
export const getAllLiveStreams = asyncHandler(
  async (_req: Request, res: Response) => {
    const liveStreams = await LiveStream.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: liveStreams,
    });
  }
);

// Toggle live stream status (Admin only)
export const toggleLiveStreamStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const liveStream = await LiveStream.findById(id);

    if (!liveStream) {
      res.status(404);
      throw new Error("Live stream not found");
    }

    // If activating this stream, deactivate all others
    if (!liveStream.isActive) {
      await LiveStream.updateMany({}, { isActive: false });
    }

    liveStream.isActive = !liveStream.isActive;
    await liveStream.save();

    return res.status(200).json({
      success: true,
      data: liveStream,
    });
  }
);
