import { Request, Response } from "express";
import { Testimonial, TestimonialStatus } from "../models/Testimonial";
import { asyncHandler } from "../middleware/asyncHandler";

// @desc    Create a testimonial
// @route   POST /api/testimonials
// @access  Public
export const createTestimonial = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, title, message } = req.body;

    if (!name || !title || !message) {
      res.status(400);
      throw new Error("Please provide a name, title, and message");
    }

    const testimonial = await Testimonial.create({
      name: name.trim(),
      title: title.trim(),
      message: message.trim(),
      status: TestimonialStatus.PENDING,
    });

    res.status(201).json({
      success: true,
      data: testimonial,
      message: "Your testimony has been submitted and is awaiting approval.",
    });
  }
);

// @desc    Get all approved testimonials
// @route   GET /api/testimonials
// @access  Public
export const getApprovedTestimonials = asyncHandler(
  async (req: Request, res: Response) => {
    const page = parseInt(req.query["page"] as string) || 1;
    const limit = parseInt(req.query["limit"] as string) || 10;
    const skip = (page - 1) * limit;

    const testimonials = await Testimonial.find({
      status: TestimonialStatus.APPROVED,
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Testimonial.countDocuments({
      status: TestimonialStatus.APPROVED,
    });

    res.status(200).json({
      success: true,
      data: testimonials,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  }
);

// @desc    Get all testimonials (for admin)
// @route   GET /api/admin/testimonials
// @access  Private/Admin
export const getAllTestimonials = asyncHandler(
  async (req: Request, res: Response) => {
    const status = req.query["status"] as string;
    const page = parseInt(req.query["page"] as string) || 1;
    const limit = parseInt(req.query["limit"] as string) || 20;
    const skip = (page - 1) * limit;

    // Build filter based on status query parameter
    const filter: any = {};
    if (
      status &&
      Object.values(TestimonialStatus).includes(status as TestimonialStatus)
    ) {
      filter.status = status;
    }

    const testimonials = await Testimonial.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Testimonial.countDocuments(filter);

    // Get counts for each status for admin dashboard
    const statusCounts = await Promise.all([
      Testimonial.countDocuments({ status: TestimonialStatus.PENDING }),
      Testimonial.countDocuments({ status: TestimonialStatus.APPROVED }),
      Testimonial.countDocuments({ status: TestimonialStatus.REJECTED }),
    ]);

    res.status(200).json({
      success: true,
      data: testimonials,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      counts: {
        pending: statusCounts[0],
        approved: statusCounts[1],
        rejected: statusCounts[2],
        total: statusCounts[0] + statusCounts[1] + statusCounts[2],
      },
    });
  }
);

// @desc    Approve a testimonial
// @route   PUT /api/admin/testimonials/:id/approve
// @access  Private/Admin
export const approveTestimonial = asyncHandler(
  async (req: Request, res: Response) => {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params["id"],
      { status: TestimonialStatus.APPROVED },
      { new: true, runValidators: true }
    );

    if (!testimonial) {
      res.status(404);
      throw new Error("Testimonial not found");
    }

    // Ensure a consistent success response
    res.status(200).json({ success: true, data: testimonial });
  }
);

// @desc    Reject a testimonial
// @route   PUT /api/admin/testimonials/:id/reject
// @access  Private/Admin
export const rejectTestimonial = asyncHandler(
  async (req: Request, res: Response) => {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params["id"],
      { status: TestimonialStatus.REJECTED },
      { new: true, runValidators: true }
    );

    if (!testimonial) {
      res.status(404);
      throw new Error("Testimonial not found");
    }

    // Ensure a consistent success response
    res.status(200).json({ success: true, data: testimonial });
  }
);

// @desc    Delete a testimonial
// @route   DELETE /api/admin/testimonials/:id
// @access  Private/Admin
export const deleteTestimonial = asyncHandler(
  async (req: Request, res: Response) => {
    const testimonial = await Testimonial.findByIdAndDelete(req.params["id"]);

    if (!testimonial) {
      res.status(404);
      throw new Error("Testimonial not found");
    }

    // Ensure a consistent success response for delete action
    res.status(200).json({ success: true, data: {} });
  }
);
