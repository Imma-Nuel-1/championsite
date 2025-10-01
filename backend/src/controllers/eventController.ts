import { Request, Response } from "express";
import Event from "../models/event";
import { asyncHandler } from "../middleware/asyncHandler";

// Utility function to update event statuses and cleanup old events
const updateEventStatuses = async () => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Delete events that are more than 7 days old
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  await Event.deleteMany({
    date: { $lt: sevenDaysAgo },
    status: "completed",
  });

  // Update event statuses based on current date
  await Event.updateMany(
    { date: { $lt: today }, status: { $ne: "completed" } },
    { status: "completed" }
  );

  await Event.updateMany(
    {
      date: { $gte: today, $lt: tomorrow },
      status: { $ne: "today" },
    },
    { status: "today" }
  );

  await Event.updateMany(
    {
      date: { $gte: tomorrow },
      status: { $ne: "upcoming" },
    },
    { status: "upcoming" }
  );
};

// GET /api/events?page=1&limit=10&includeAll=true
export const getEvents = asyncHandler(async (req: Request, res: Response) => {
  // Update event statuses and cleanup old events
  await updateEventStatuses();

  const {
    page = "1",
    limit = "10",
    includeAll = "false",
  } = req.query as {
    page?: string;
    limit?: string;
    includeAll?: string;
  };

  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);
  const skip = (pageNumber - 1) * limitNumber;

  // Filter events based on includeAll parameter
  const filter =
    includeAll === "true"
      ? {} // Include all events for admin
      : { status: { $in: ["upcoming", "today"] } }; // Only show upcoming and today events for public

  const [events, total] = await Promise.all([
    Event.find(filter).sort({ date: "asc" }).skip(skip).limit(limitNumber),
    Event.countDocuments(filter),
  ]);

  res.status(200).json({
    events,
    totalPages: Math.ceil(total / limitNumber),
  });
});

// GET /api/events/:id
export const getEventById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const event = await Event.findById(id);

    if (!event) {
      res.status(404);
      throw new Error("Event not found");
    }

    res.status(200).json({ event });
  }
);

// GET /api/events/:id/ics - export ICS for the event
export const getEventICS = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const start = new Date(event.date);
    const dtStart = start
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}Z$/, "Z");

    const dtStamp = new Date()
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}Z$/, "Z");

    const uid = `${event._id}@championsite`;

    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//championsite//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTAMP:${dtStamp}`,
      `DTSTART:${dtStart}`,
      `SUMMARY:${escapeICS(event.title)}`,
      event.location ? `LOCATION:${escapeICS(event.location)}` : undefined,
      event.description
        ? `DESCRIPTION:${escapeICS(event.description)}`
        : undefined,
      "END:VEVENT",
      "END:VCALENDAR",
    ]
      .filter(Boolean)
      .join("\r\n");

    res.setHeader("Content-Type", "text/calendar; charset=utf-8");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${slugify(event.title)}.ics"`
    );
    return res.status(200).send(ics);
  } catch (error) {
    console.error("Error generating ICS:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const escapeICS = (text: string) =>
  text
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

// POST /api/events
export const createEvent = asyncHandler(async (req: Request, res: Response) => {
  const { title, date, time, location, description, imageUrl } = req.body;

  const newEvent = new Event({
    title,
    date,
    time,
    location,
    description,
    imageUrl,
  });

  const savedEvent = await newEvent.save();
  res.status(201).json({ event: savedEvent });
});

// PUT /api/events/:id
export const updateEvent = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, date, time, location, description, imageUrl } = req.body;

  const updatedEvent = await Event.findByIdAndUpdate(
    id,
    { title, date, time, location, description, imageUrl },
    { new: true }
  );

  if (!updatedEvent) {
    res.status(404);
    throw new Error("Event not found");
  }

  res.status(200).json({ event: updatedEvent });
});

// DELETE /api/events/:id
export const deleteEvent = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedEvent = await Event.findByIdAndDelete(id);

  if (!deletedEvent) {
    res.status(404);
    throw new Error("Event not found");
  }

  res.status(200).json({ message: "Event deleted successfully" });
});

// GET /api/events/upcoming
export const getUpcomingEvents = asyncHandler(
  async (req: Request, res: Response) => {
    const limit = parseInt(req.query["limit"] as string) || 3;

    // Get start of today to include events happening today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingEvents = await Event.find({
      date: { $gte: today },
    })
      .sort({ date: "asc" })
      .limit(limit);

    res.status(200).json({ events: upcomingEvents });
  }
);
