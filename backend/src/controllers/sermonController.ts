import { Request, Response } from "express";
import Sermon from "../models/sermon";
import { asyncHandler } from "../middleware/asyncHandler";

// Create a sermon
export const createSermon = asyncHandler(
  async (req: Request, res: Response) => {
    const { title, preacher, date, description, mediaUrl } = req.body;

    if (!title || !preacher || !date) {
      res.status(400);
      throw new Error("Title, preacher, and date are required.");
    }

    const newSermon = new Sermon({
      title,
      preacher,
      date,
      description,
      mediaUrl,
    });

    await newSermon.save();

    res.status(201).json({
      success: true,
      message: "Sermon created successfully.",
      data: newSermon,
    });
  }
);

// Fetch sermons with search + pagination
export const getSermons = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query["page"] as string) || 1;
  const limit = parseInt(req.query["limit"] as string) || 10;
  const search = (req.query["search"] as string) || "";
  const skip = (page - 1) * limit;

  const query = search
    ? {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { preacher: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  const [sermons, total] = await Promise.all([
    Sermon.find(query)
      .sort({ date: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Sermon.countDocuments(query),
  ]);

  res.status(200).json({
    success: true,
    data: sermons,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
});

// Get a single sermon by ID
export const getSermonById = asyncHandler(
  async (req: Request, res: Response) => {
    const sermon = await Sermon.findById(req.params["id"]);
    if (!sermon) {
      res.status(404);
      throw new Error("Sermon not found");
    }
    res.status(200).json({ success: true, data: sermon });
  }
);

// Update a sermon
export const updateSermon = asyncHandler(
  async (req: Request, res: Response) => {
    const sermon = await Sermon.findByIdAndUpdate(req.params["id"], req.body, {
      new: true,
      runValidators: true,
    });

    if (!sermon) {
      res.status(404);
      throw new Error("Sermon not found");
    }

    res.status(200).json({ success: true, data: sermon });
  }
);

// Delete a sermon
export const deleteSermon = asyncHandler(
  async (req: Request, res: Response) => {
    const sermon = await Sermon.findByIdAndDelete(req.params["id"]);

    if (!sermon) {
      res.status(404);
      throw new Error("Sermon not found");
    }

    res.status(200).json({ success: true, message: "Sermon deleted" });
  }
);
